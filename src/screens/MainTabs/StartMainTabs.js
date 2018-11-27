import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

const StartMainTabs = () => {
  //Icons returns a promise, we will need to wait before we load the tab, therefor we use promise  
  Promise.all([
    Icon.getImageSource("md-home",30),
    Icon.getImageSource("md-person",30),
    Icon.getImageSource('md-information-circle-outline',30),
    Icon.getImageSource('md-menu',30)
  ]).then(sources => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              width: 100,
              component: {
                name: 'water-app.SideDrawerScreen',
              }
            },
            center: {
              stack: {
                id: "AppRoot",
                children: [{
                  component: {
                    id: "App",
                    name: "water-app.AuthScreen"
                  }
                }]
              },
              bottomTabs: {
                id: 'BottomTabsId',
                options: {
                  topBar: {
                    visible: true,
                  }
                },
                children: [
                  {
                    stack: {
                      id: 'Tabs',
                      children: [
                        {
                          component: {
                            name: 'water-app.EnqiryHomeScreen',
                            options: {
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[3],
                                    id: 'buttonmenu22'
                                  }
                                ],
                              },
                              bottomTab: {
                                badge: '2',
                                fontSize: 12,
                                text: 'Enquiry',
                                icon: sources[2]
                              }
                            }
                          },
                        },
                      ]
                    }
                  },
                  {
                    stack: {
                      id: 'Tabs2',
                      children: [
                        {
                          component: {
                            name: 'water-app.EnqiryHomeScreen',
                            options: {
                              bottomTab: {
                                badge: 'New',
                                text: 'Home',
                                fontSize: 12,
                                icon: sources[0]
                              },
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[3],
                                    id: 'buttonmenu22'
                                  }
                                ],
                              },
                            }
                          },
                        },
                      ]
                    }
                  },
                  {
                    stack: {
                      id: 'Tabs3',
                      children: [
                        {
                          component: {
                            name: 'water-app.UserProfileScreen',
                            options: {
                              bottomTab: {
                                badge: '',
                                text: 'Profile',
                                fontSize: 12,
                                icon: sources[1]
                              },
                              passProps: {
                                text: 'This is tab 1'
                              },
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[3],
                                    id: 'buttonmenu22'
                                  }
                                ],
                              },
                            }
                          },
                        },
                      ]
                    }
                  },
                ],
              },
            }
          }
        }
      })
    }) 
}

export default StartMainTabs;