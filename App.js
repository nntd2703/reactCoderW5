import React from "react";
import { Text, View, FlatList, ActivityIndicator, Content } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import TrendingItem from "./components/TrendingItem";
import ItemNewDetails from "./components/ItemNewDetails";
import { LIST_CATEGORY } from "./utils/functionUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    const listData = LIST_CATEGORY.map(item => {
      return {
        ...item,
        getRequest: this.createRequestUrl(item, item.p, item.c)
      };
    });

    this.page = 1;
    this.state = {
      listData,
      loading: "false"
    };
  }

  createRequestUrl(item, p, c) {
    return `https://api.news.zing.vn/api/mobile/${item.key}.json?p=${p}&c=${c}`;
  }

  async fetchData(url) {
    return await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  async fetchAllData(listData) {
    const cloneList = Promise.all(
      listData.map(async item => {
        const res = await fetch(item.getRequest);
        const resJson = await res.json();
        return resJson.data;
      })
    );
    return cloneList;
  }

  componentDidMount() {
    const { listData } = this.state;
    this.setState({ loading: true });
    this.fetchAllData(listData)
      .then(data => {
        this.setState(
          {
            listData: listData.map((item, index) => {
              return {
                ...item,
                data: data[index]
              };
            })
          },
          () => {
            //console.log(this.state)
            this.setState({ loading: false });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  _keyExtractor = (item, index) => item.id;

  handleScrollEnd = article => () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      let listData = [...this.state.listData];
      let page = article.p;
      let quantityItem = article.c;
      if (quantityItem <= 50) {
        quantityItem = quantityItem + 10;
      } else {
        page++;
        quantityItem = 10;
      }
      let index = listData.findIndex(item => item.name === article.name);
      if (index >= 0) {
        console.log(index);
        this.fetchData(this.createRequestUrl(article, page, quantityItem)).then(
          data => {
            listData[index] = {
              ...listData[index],
              data,
              p: page,
              c: quantityItem
            };

            console.log(listData[index]);
            this.setState({ listData }, () => {
              console.log("stateNe", this.state);
            });
          }
        );
      }
      this.onEndReachedCalledDuringMomentum = false;
    }
  };

  render() {
    const { listData } = this.state;
    if (this.state.loading && this.page === 1) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ActivityIndicator
            size="large"
            style={{ color: "#000", width: "100%", height: "100%" }}
          />
        </View>
      );
    }
    return (
      <ScrollableTabView
        style={{ marginTop: 20, flex: 1 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {listData.map(article => {
          return (
            <View
              tabLabel={article.title}
              style={{ paddingHorizontal: 15, flex: 1 }}
              key={article.id}
            >
              {article.data ? (
                <FlatList
                  data={article.data}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item, index }) => {
                    if (index === 0)
                      return <TrendingItem item={article.data[index]} />;
                    else return <ItemNewDetails key={item.id} data={item} />;
                  }}
                  onEndReachedThreshold={0.4}
                  onEndReached={this.handleScrollEnd(article)}
                  onMomentumScrollBegin={() => {
                    this.onEndReachedCalledDuringMomentum = false;
                  }}
                />
              ) : (
                <Text>Request Not Found</Text>
              )}
            </View>
          );
        })}
      </ScrollableTabView>
    );
  }
}

export default App;
