import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions, StyleSheet, Alert, StatusBar, TouchableWithoutFeedback } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icons from './Icons';
import colors from '../colors/colors';
import RootNavigation from '../navigations/RootNavigation';
import { useSelector } from 'react-redux';


const NoteDetailScreen = ({ route, navigation }) => {
    const [hidden, setHidden] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { note, onUpdate } = route.params || {};
    const [statusBarStyle, setStatusBarStyle] = useState('dark-content');
    const [statusBarTransition, setStatusBarTransition] = useState('fade');

    const colorScheme = useSelector(state => state.value);
    // console.log(colorScheme);
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const saveNote = () => {
        const db = SQLite.openDatabase({ name: 'notesDB', location: 'default' });

        if (title.trim() === '' && content.trim() === '') {
            RootNavigation.goBack();
        } else {
            db.transaction(tx => {
                if (note) {
                    tx.executeSql(
                        'UPDATE notes SET title = ?, content = ? WHERE id = ?',
                        [title, content, note.id],
                        () => {
                            onUpdate();
                            RootNavigation.goBack();
                        },
                        error => {
                            console.error('Error updating note: ', error);
                        }
                    );
                } else {
                    tx.executeSql(
                        'INSERT INTO notes (title, content) VALUES (?, ?)',
                        [title, content],
                        () => {
                            onUpdate();
                            RootNavigation.goBack();
                        },
                        error => {
                            console.error('Error inserting note: ', error);
                        }
                    );
                }
            });
        }
    };

    const displayDeleteAlert = () => {
        Alert.alert(
            'Are You Sure!',
            'This action will delete your note permanently',
            [
                {
                    text: 'Delete',
                    onPress: deleteNote,
                },
                {
                    text: 'No Thanks',
                    onPress: () => console.log('no thanks'),
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const deleteNote = () => {
        if (note) {
            const db = SQLite.openDatabase({ name: 'notesDB', location: 'default' });

            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM notes WHERE id = ?',
                    [note.id],
                    () => {
                        onUpdate();
                        RootNavigation.goBack();
                    },
                    error => {
                        console.error('Error deleting note: ', error);
                    }
                );
            });
        }
    };
    const lightStyles = StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            flex: 1,
            zIndex: 1,
            backgroundColor: colors.LM_LIGHT,
        },
        // ... (other light mode styles)
    });

    const darkStyles = StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            flex: 1,
            zIndex: 1,
            backgroundColor: colors.DARK,
        },
        // ... (other dark mode styles)
    });

    const styles = StyleSheet.create({
        headerButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 15,
        },
        container: {
            // paddingHorizontal: 20,
            flex: 1,
            zIndex: 1,
            // backgroundColor: colors.LM_LIGHT,
            // backgroundColor: colors.DARK,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            backgroundColor: colors.LM_LIGHT,
            borderTopWidth: 0.5,
            borderTopColor: colors.LM_PRIMARY,
        },
        button: {
            padding: 5,
            borderRadius: 10,
            elevation: 0,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            // backgroundColor: colors.LM_LIGHT,
            width: Dimensions.get('window').width / 7,
            height: Dimensions.get('window').width / 7,
        },
        title: {
            // fontFamily: 'Poppins-Black',
            fontSize: 25,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.LM_PRIMARY,
            color: colorScheme ? colors.LM_LGRAY : colors.DARK,
        },
        desc: {
            // fontFamily: 'Poppins-Black',
            fontSize: 20,
            color: colorScheme ? colors.LM_LGRAY : colors.DARK,
        },
    });


    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={colors.LM_PRIMARY}
                barStyle={statusBarStyle}
                showHideTransition={statusBarTransition}
                hidden={hidden}
            />
            <TouchableWithoutFeedback>

                <View style={[styles.container, { backgroundColor: colorScheme ? colors.DARK : colors.LM_LIGHT }]}>
                    {/* <View style={styles.container}> */}
                    {React.useLayoutEffect(() => {
                        navigation.setOptions({
                            headerRight: () => (
                                <View style={styles.headerButtonContainer}>
                                    <TouchableOpacity style={[styles.button, { color: colorScheme ? colors.DARK : colors.LM_LIGHT }]} onPress={saveNote}>
                                        <Icons name="check" />
                                    </TouchableOpacity>
                                </View>
                            ),
                        });
                    }, [navigation, saveNote])}
                    <View style={{ flex: 1, marginTop: 20, zIndex: 2 }}>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={text => setTitle(text)}
                            // style={[styles.title, { color: colorScheme ? colors.LM_LIGHT : colors.DARK }]}
                            style={styles.title}
                        />
                        <TextInput
                            placeholder="Content"
                            value={content}
                            onChangeText={text => setContent(text)}
                            multiline
                            style={styles.desc}
                        />
                    </View>
                    <View style={[styles.buttonContainer, { backgroundColor: colorScheme ? colors.DARK : colors.LM_LIGHT }]}>
                        {note && (
                            <TouchableOpacity style={styles.button} onPress={displayDeleteAlert}>
                                <Icons name="delete" />
                            </TouchableOpacity>

                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

// const styles = StyleSheet.create({
//     headerButtonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         paddingRight: 15,
//     },
//     container: {
//         // paddingHorizontal: 20,
//         flex: 1,
//         zIndex: 1,
//         // backgroundColor: colors.LM_LIGHT,
//         // backgroundColor: colors.DARK,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 15,
//         backgroundColor: colors.LM_LIGHT,
//         borderTopWidth: 0.5,
//         borderTopColor: colors.LM_PRIMARY,
//     },
//     button: {
//         padding: 5,
//         borderRadius: 10,
//         elevation: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 0,
//         backgroundColor: colors.LM_LIGHT,
//         width: Dimensions.get('window').width / 7,
//         height: Dimensions.get('window').width / 7,
//     },
//     title: {
//         // fontFamily: 'Poppins-Black',
//         fontSize: 25,
//         borderBottomWidth: 0.5,
//         borderBottomColor: colors.LM_PRIMARY,
//     },
//     desc: {
//         // fontFamily: 'Poppins-Black',
//         fontSize: 20,
//     },
// });

export default NoteDetailScreen;
