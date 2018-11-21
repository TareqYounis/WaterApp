import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

const StartMainTabs = () => {
  //Icons returns a promise, we will need to wait before we load the tab, therefor we use promise  
  Promise.all([
    Icon.getImageSource("md-home",30),
    Icon.getImageSource("md-home",30),
    Icon.getImageSource('ios-menu',30)
  ]).then(sources => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              width: 100,
              component: {
                name: 'water-app.AuthScreen',
              }
            },
            center: {
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
                                    icon: sources[1],
                                    id: 'buttonmenu22'
                                  }
                                ],
                              },
                              bottomTab: {
                                badge: '2',
                                fontSize: 12,
                                text: 'Create Job',
                                icon: sources[1]
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
                                text: 'Credits',
                                fontSize: 12,
                                icon: sources[0]
                              },
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[1],
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
                            name: 'water-app.EnqiryHomeScreen',
                            options: {
                              bottomTab: {
                                badge: '',
                                text: 'Profile',
                                fontSize: 12,
                                icon: sources[1]
                              },
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[1],
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