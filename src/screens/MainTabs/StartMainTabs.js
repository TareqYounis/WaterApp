import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import IconOcticons from "react-native-vector-icons/Octicons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { getItem } from '../../StorageData';

const StartMainTabs = () => {
  // getuser Id from storage
    getItem('userId')
    .then(results => {
      console.log(results);
    })
  //Icons returns a promise, we will need to wait before we load the tab, therefor we use promise  
  Promise.all([
    Icon.getImageSource("md-stats",30),
    IconMaterial.getImageSource("water",30),
    Icon.getImageSource('md-information-circle-outline',30),
    Icon.getImageSource('md-menu',30),
    IconOcticons.getImageSource('report',30)
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
              // add all componenets in stack that we need to navigate to from the SideDrawer
              stack: {
                id: "sideDrawerComponents",
                children: [{
                  component: {
                    id: "complaintSD",
                    name: "water-app.ComplaintScreen"
                  },
                  component: {
                    id: "MainAppSD",
                    name: "water-app.MainApplicationScreen"
                  },
                  component: {
                    id: "ObjectionSD",
                    name: "water-app.ObjectionService"
                  },                  
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
                            name: 'water-app.homeScreen',
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
                                text: 'Statistics',
                                icon: sources[0]
                              },
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
                                text: 'Enquiry',
                                fontSize: 12,
                                icon: sources[2]
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
                                text: 'Water Accounts',
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