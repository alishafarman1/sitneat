import {NavigationActions,StackActions} from 'react-navigation';

export const resetRoute = (navigation, route, params = {}, landOn = 0) => {
    let actions = [];
    if (typeof route === "string") {
        actions.push(NavigationActions.navigate({routeName: route, params: params}));
    } else {
        if(Array.isArray(params)){
            let exp = [{}];
            params = exp.concat(params)
        }
        for (let i = 0; i < route.length; i++) {
            let p = (Array.isArray(params) ? params[i] : params);
            actions.push(NavigationActions.navigate({routeName: route[i], params: p,key:route[i]+"-"+i}));
        }
    }

    const resetAction = StackActions.reset({
        index: landOn,
        key: null,
        actions: actions,
    });

    navigation.dispatch(resetAction);
};
