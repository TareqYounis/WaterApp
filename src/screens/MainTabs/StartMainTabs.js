import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import IconOcticons from "react-native-vector-icons/Octicons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { getItem } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

const StartMainTabs = () => {
  // get langague to decide side menu and button direction
  let sideMenuDirection = 'left';
  let menuButton = 'leftButtons';
  getItem('language')
  .then(results => {
      sideMenuDirection = results === 'Arabic' ? 'right' :  'left'
      menuButton = results === 'Arabic' ? 'rightButtons' :  'leftButtons'
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
      return results !== 'none' ? results :  'Arabic'
    })]).then(sources => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            [sideMenuDirection]: {
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
                    visible: true
                  },
                  layout: {
                    direction: 'ltr',
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
                            id: 'EnquiryTab',
                            options: {
                              topBar: {
                                background: {
                                  color: colors.DarkBlue
                                },
                                visible: true,
                                [menuButton]: [
                                  {
                                    icon: sources[3],
                                    color: 'white'
                                  }
                                ],
                                title: {
                                  text: data[sources[5]]['tabEnquiry'],
                                  color: 'white',
                                  fontFamily: fonts.TunisiaLt,
                                  fontSize: 20,
                                  alignment: 'center' 
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
                                background: {
                                  color: colors.DarkBlue
                                },
                                visible: true,
                                [menuButton]: [
                                  {
                                    icon: sources[3],
                                    color: 'white'
                                  }
                                ],
                                title: {
                                  text: data[sources[5]]['tabStatisc'],
                                  color: 'white',
                                  fontFamily: fonts.TunisiaLt,
                                  fontSize: 20,
                                  alignment: 'center' 
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
                                background: {
                                  color: colors.DarkBlue
                                },
                                visible: true,
                                [menuButton]: [
                                  {
                                    icon: sources[3],
                                    color: 'white'
                                  }
                                ],
                                title: {
                                  text: data[sources[5]]['tabSubsc'],
                                  color: 'white',
                                  fontFamily: fonts.TunisiaLt,
                                  fontSize: 20,
                                  alignment: 'center' 
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