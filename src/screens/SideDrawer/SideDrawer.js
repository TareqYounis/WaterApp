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
            }
        }
    });
}

export default SideDrawer;