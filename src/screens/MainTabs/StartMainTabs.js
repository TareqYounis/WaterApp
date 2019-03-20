import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import IconOcticons from "react-native-vector-icons/Octicons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { getItem } from '../../StorageData';
import * as data from './../../assets/lang.json';

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
    IconOcticons.getImageSource('report',30),
    // get language from storage and pass it
    getItem('language')
    .then(results => {
      return results 
    })]).then(sources => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              width: 100,
              component: {
                name: 'water-app.SideDrawerScreen',
                id: "sideDrawer",
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
                  },
                },
                children: [
                  {
                    stack: {
                      id: 'Tabs',
                      children: [
                        {
                          component: {
                            name: 'water-app.EnqiryHomeScreen',
                            id: 'EnquiryTab',
                            options: {
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[3],
                                    id: 'buttonmenu22'
                                  }
                                ],
                                title: {
                                  text: data[sources[5]]['tabEnquiry']
                                }
                              },
                              bottomTab: {
                                // badge: '2',
                                fontSize: 12,
                                text: 'Enquiry',
                                icon: sources[2]
                              }
                            },
                            passProps: {
                              lang: sources[5]
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
                            name: 'water-app.statisticsScreen',
                            options: {
                              bottomTab: {
                                // badge: 'New',
                                text: 'Statistics',
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
                                title: {
                                  text: data[sources[5]]['tabStatisc']
                                }
                              },
                              passProps: {
                                lang: sources[5]
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
                            name: 'water-app.UserAccountsScreen',
                            options: {
                              bottomTab: {
                                badge: '',
                                text: 'Accounts',
                                fontSize: 12,
                                icon: sources[1]
                              },
                              passProps: {
                                lang: sources[5]
                              },
                              topBar: {
                                visible: true,
                                leftButtons: [
                                  {
                                    icon: sources[3],
                                    id: 'buttonmenu22'
                                  }
                                ],
                                title: {
                                  text: data[sources[5]]['tabSubsc']
                                }
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