import React from "react";
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fruits, candies, astronomy, basket, jar, blackHole } from "./items";

export class Game extends React.Component {
  state = {
    grid: [
      Dimensions.get("window").width / 2 - 150,
      Dimensions.get("window").width / 2 - 100,
      Dimensions.get("window").width / 2 - 50,
      Dimensions.get("window").width / 2,
      Dimensions.get("window").width / 2 + 50,
      Dimensions.get("window").width / 2 + 100,
      Dimensions.get("window").width / 2 + 150,
    ],
    characterPosition: 3,
    currentItems: [],
    countItem: 0,
    score: 0,
    time: 59,
    collectItems: [],
  };

  componentDidMount() {
    this.gameRunning();
  }

  gameRunning() {
    this.generateItems = setInterval(() => {
      if (this.state.score > 50) {
        this.generateItem(astronomy);
      } else if (this.state.score > 30) {
        this.generateItem(candies);
      } else {
        this.generateItem(fruits);
      }
    }, 500);

    this.handleItems = setInterval(() => {
      this.itemFall();
      this.itemDestroy();
    }, 25);

    this.countDown = setInterval(() => {
      this.setState({ time: this.state.time - 1 });
    }, 1000);
  }

  moveLeft() {
    if (this.state.characterPosition != 0)
      this.setState({ characterPosition: this.state.characterPosition - 1 });
  }

  moveRight() {
    if (this.state.characterPosition != 6)
      this.setState({ characterPosition: this.state.characterPosition + 1 });
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateItem(array) {
    let index = this.randomInt(0, array.length - 1);
    let newItem = array[index];
    let position = this.randomInt(0, 6);
    newItem.pos = position;
    newItem.bottom = 350;
    newItem.no = this.state.countItem;

    this.setState({
      currentItems: [...this.state.currentItems, newItem],
      countItem: this.state.countItem + 1,
    });
  }

  itemFall() {
    this.setState((state) => ({
      currentItems: state.currentItems.map((item) => {
        return { ...item, bottom: item.bottom - item.speed };
      }),
    }));
  }

  itemDestroy() {
    this.state.currentItems.forEach((item) => {
      if (item.pos == this.state.characterPosition && item.bottom < 0) {
        this.setState({
          score: this.state.score + item.score,
          collectItems: [...this.state.collectItems, item.itemNo],
          currentItems: this.state.currentItems.filter(
            (ele) => ele.no != item.no
          ),
        });
      }
    });

    this.setState({
      currentItems: this.state.currentItems.filter((item) => item.bottom > -25),
    });
  }

  renderItems() {
    let items = [];
    this.state.currentItems.forEach((item, index) => {
      items.push(
        <View
          key={index}
          style={{
            bottom: item.bottom,
            left: this.state.grid[item.pos] - 56,
            alignSelf: "center",
            position: "absolute",
          }}
        >
          <Image
            style={{
              width: 45,
              height: 45,
            }}
            source={item.src}
          />
        </View>
      );
    });
    return items;
  }

  renderResultScreen() {
    clearInterval(this.generateItems);
    clearInterval(this.handleItems);
    clearInterval(this.countDown);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>
          Total Score: <Text style={{ fontSize: 48 }}>{this.state.score}</Text>
        </Text>

        <View height={20} />

        <View height={40} />

        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            backgroundColor: "#ff002b",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            this.setState({
              characterPosition: 4,
              countItem: 0,
              currentItems: [],
              score: 0,
              time: 59,
              collectItems: [],
            });
            this.gameRunning();
          }}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderGamePlayScreen() {
    return (
      <View
        style={{
          marginTop: 100,
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 32 }}>
          00:{this.state.time < 10 ? "0" + this.state.time : this.state.time}
        </Text>
        <View
          style={{
            width: 350,
            height: 400,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          {this.renderItems()}
        </View>
        <Image
          style={{
            width: 45,
            height: 45,
            left: this.state.grid[this.state.characterPosition] - 22.5,
          }}
          source={this.state.score < 30 ? basket : this.state.score > 50 ? blackHole : jar}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => this.moveLeft()}
            style={{
              width: 120,
              height: 80,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <AntDesign name="caretleft" size={45} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.moveRight()}
            style={{
              width: 120,
              height: 80,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 20,
            }}
          >
            <AntDesign name="caretright" size={45} />
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: -10, fontSize: 28, alignSelf: "center" }}>
          {this.state.score}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.time <= 0) {
      return this.renderResultScreen();
    } else {
      return this.renderGamePlayScreen();
    }
  }
}