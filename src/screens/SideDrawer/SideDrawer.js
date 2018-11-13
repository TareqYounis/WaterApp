import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

const SideDrawer = () => {
    Navigation.setRoot({
        root: {
        sideMenu: {
            left: {
            component: {
                name: 'water-app.ComplaintScreen',
                passProps: {
                text: 'This is a left side menu screen'
                }
            }
            },
            center: {
            component: {
                name: 'water-app.ComplaintScreen'
            },
            },
            right: {
            component: {
                name: 'water-app.ComplaintScreen',
                passProps: {
                text: 'This is a right side menu screen'
                }
            }
            }
        }
        }
    });
}

export default SideDrawer;