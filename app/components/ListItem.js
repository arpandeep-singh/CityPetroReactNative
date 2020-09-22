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

function ListItem({
  title,
  subtitle,
  trailingText,
  image,
  IconComponent,
  onPress,
  imageSize = 60,
}) {
  return (
    <TouchableHighlight
      underlayColor={"grey"}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.container}>
        {IconComponent}
        {image && (
          <Image
            style={[
              styles.image,
              {
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
              },
            ]}
            source={image}
          />
        )}
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
