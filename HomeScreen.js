import { NativeBaseProvider, Button, Flex, Modal, AlertDialog, Menu, HamburgerIcon, Box } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Image, Animated, Easing, Alert, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bot from './Bot';



function HomeScreen({ navigation }) {
    const [reg, setReg] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(0);
    const [id, setId] = useState(null);

    const [reg1, setReg1] = useState(false);
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [status1, setStatus1] = useState(0);
    const [id1, setId1] = useState(null);

    const [token, setToken] = useState(null);




    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem("Quikbill");
            setToken(() => token);
        }
        getToken();
    }, []);
    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 201) {
                const responseData = await response.json();

                setId(responseData.id);
                console.log('User registered successfully');
                setReg(false);
                setStatus(1);
            } else {
                console.error('Error registering user');
                setReg(false);
                setStatus(2);
            }
        } catch (error) {
            console.error('Network error:', error);
            setReg(false);
            setStatus(2);
        }
    };

    const handlelogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email1, password1, id1 }),
            });
            if (response.status === 200) {
                console.log('User registered successfully');
                await AsyncStorage.setItem("Quikbill", id1);
                setReg1(false);
                setStatus1(1);
            } else {
                console.error('Error registering user');
                setReg1(false);
                setStatus1(2);
            }
        } catch (error) {
            console.error('Network error:', error);
            setReg1(false);
            setStatus1(2);
        }
    };


    return (
        <SafeAreaView style={{ backgroundColor: "black", height: '100%' }}>

            <NativeBaseProvider>
                {status == 1 &&
                    <AlertDialog
                        isOpen={true}
                        motionPreset="fade"

                    >
                        <AlertDialog.Content>
                            <AlertDialog.Header fontSize="lg" fontWeight="bold">
                                Registration Successfull
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                You have successfully registered in Quikbill.
                                This is your secret id: {id}
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button onPress={() => setStatus(0)}
                                >
                                    Thanks
                                </Button>

                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                }
                {status == 2 && <AlertDialog
                    isOpen={true}
                    motionPreset="fade"

                >
                    <AlertDialog.Content>
                        <AlertDialog.Header fontSize="lg" fontWeight="bold">
                            Registration Unsuccessfull

                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            Please try again later
                        </AlertDialog.Body>
                        <AlertDialog.Footer>

                            <Button colorScheme="red" ml="3" onPress={() => setStatus(0)}
                            >
                                Okay
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
                }


                {status1 == 1 &&
                    <AlertDialog
                        isOpen={true}
                        motionPreset="fade"

                    >
                        <AlertDialog.Content>
                            <AlertDialog.Header fontSize="lg" fontWeight="bold">
                                Login Successfull
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                You have successfully logged in Quikbill.
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button onPress={() => setStatus1(0)}
                                >
                                    Thanks
                                </Button>

                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                }
                {status1 == 2 && <AlertDialog
                    isOpen={true}
                    motionPreset="fade"

                >
                    <AlertDialog.Content>
                        <AlertDialog.Header fontSize="lg" fontWeight="bold">
                            Login Unsuccessfull

                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            Please check your details
                        </AlertDialog.Body>
                        <AlertDialog.Footer>

                            <Button colorScheme="red" ml="3" onPress={() => setStatus1(0)}
                            >
                                Okay
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
                }

                <Modal
                    isOpen={reg}
                    onClose={() => {

                    }}
                    style={{ zIndex: 1000 }}

                >
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header >Register</Modal.Header>
                        <Modal.Body >
                            <TextInput
                                placeholder="Email"
                                onChangeText={text => setEmail(text)}
                                value={email}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={text => setPassword(text)}
                                value={password}
                                secureTextEntry
                                style={{ marginTop: "10%" }}
                            />                            </Modal.Body>
                        <Modal.Footer >
                            <Button.Group variant="ghost" space="2">
                                <Button onPress={handleRegister}>Register </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal
                    isOpen={reg1}
                    onClose={() => {

                    }}
                    style={{ zIndex: 1000 }}

                >
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header >Login</Modal.Header>
                        <Modal.Body >
                            <TextInput
                                placeholder="Email"
                                onChangeText={text => setEmail1(text)}
                                value={email1}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={text => setPassword1(text)}
                                value={password1}
                                secureTextEntry
                                style={{ marginTop: "10%" }}

                            />
                            <TextInput
                                placeholder="Secret Id"
                                onChangeText={text => setId1(text)}
                                value={id1}
                                secureTextEntry
                                style={{ marginTop: "10%" }} />                 </Modal.Body>
                        <Modal.Footer >
                            <Button.Group variant="ghost" space="2">
                                <Button onPress={handlelogin}>Login </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Flex alignItems={"center"} flexDirection={"row"} justifyContent={"space-between"} style={{ margin: "" }}>

                    <Image source={{ uri: 'https://i.ibb.co/cbkNtJJ/logo.jpg' }} style={{ height: 50, width: 100, margin: "5%" }} />
                    {!token ?
                        <Button.Group >
                            <Button onPress={() => setReg(true)}>Signup</Button>
                            <Button onPress={() => setReg1(true)}>Login</Button>
                        </Button.Group>
                        :
                        <Box w="5%" margin={"3"}>
                            <Menu w="130" trigger={triggerProps => {
                                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                    <HamburgerIcon />
                                </Pressable>;
                            }}
                                style={{ borderWidth: "1", borderColor: "black" }}
                            >
                                <Menu.Item>
                                    <Pressable onPress={() => navigation.navigate('Form')}>

                                        <Text>Dashboard</Text>
                                    </Pressable>

                                </Menu.Item>

                                <Menu.Item>
                                    <Pressable onPress={() => navigation.navigate('Stats')}>

                                        <Text>Stats</Text>
                                    </Pressable>
                                </Menu.Item>



                            </Menu>
                        </Box>

                    }




                </Flex>

                {(!reg) &&
                    <View>

                        <LottieView
                            source={require('../assets/animation_home.json')}
                            autoPlay loop
                            style={{ width: 340, height:400, margin: "auto", zIndex: "120" }}
                            />
                       
                    </View>
                }
                <Bot/>

            </NativeBaseProvider>
        </SafeAreaView>

    )
}

export default HomeScreen;