import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../colors/colors';
// import { useSelector } from 'react-redux';


type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({ name }: IconsProps) => {

    // const colorScheme = useSelector(state => state.value);
    // useEffect(() => {
    //     console.log(colorScheme);
    // }, [colorScheme]);
    switch (name) {
        case 'plus':
            return <Icon
                name='plus'
                size={30}
                color={colors.LM_PRIMARY}
                // style={[styles.icon, { ...style }]}
                style={[styles.plus]}
            />
            break;
        case 'cross':
            return <Icon
                name='times'
                size={15}
                color='gray'
            // color={colorScheme === 'dark' ? colors.LM_LIGHT : colors.DARK}

            />
            break;
        case 'notfound':
            return <Icon
                name='frown-o'
                size={100}
                style={[styles.notfound]}
                color='gray' />
            break;
        case 'check':
            return <Icon
                name='save'
                size={24}
                style={[styles.save]}
                color='gray' />
            break;
        case 'delete':
            return <Icon
                name='trash'
                size={26}
                style={[styles.delete]}
                color='red' />
            break;
        default:
            // return <Icon
            //     name='pencil'
            //     size={10}
            //     color='red' />
            break;
    }

};

const styles = StyleSheet.create({
    plus: {
        // backgroundColor: useColorScheme === 'light' ? colors.LM_LIGHT : colors.DARK,
        // backgroundColor: colors.LM_LIGHT,
        padding: 15,
        borderRadius: 10,
        // borderColor: colors.PRIMARY,
        elevation: 0,
    },
    notfound: {
        opacity: 0.3,
    },
    save: {
        color: colors.LM_PRIMARY,
    },
    delete: {
        color: colors.LM_ERROR,
    }
});
export default Icons;