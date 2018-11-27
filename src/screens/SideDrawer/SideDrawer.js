import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontAwsm from "react-native-vector-icons/FontAwesome";
import IconOcticons from "react-native-vector-icons/Octicons";

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
      <TouchableOpacity>
          <View style={styles.drawerItem}>
            <IconFontAwsm
              name="hand-stop-o"
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Objection Service</Text>
          </View>
        </TouchableOpacity>
      <TouchableOpacity>
          <View style={styles.drawerItem}>
            <IconFontAwsm
              name="unlock-alt"
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Return Blocked Counter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <IconOcticons
              name= "report"
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Complaint</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <IconFontAwsm
              name= "file-text-o"
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Applications</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default SideDrawer;
