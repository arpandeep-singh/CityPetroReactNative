import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";

import Swipeable from "react-native-gesture-handler/Swipeable";

function ListItem({
  title,
  subtitle,
  trailingText,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.textContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.description}>{subtitle}</Text>}
            </View>
            <View style={styles.trailingContainer}>
              {trailingText && (
                <Text style={styles.trailingText}>{trailingText}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  innerContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  trailingContainer: {
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    color: "grey",
  },
  trailingText: {
    color: "#85bb65",
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 10,
  },
});

export default ListItem;
