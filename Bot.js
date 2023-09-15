import { Box, Button, Modal, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bot = () => {
    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const userAvatar = require('./image/chatbot.jpg');
    const botAvatar = require('./image/user.jpeg');

    function containsAllAlphabets(word) {
        return /^[a-zA-Z]+$/.test(word);
    }

    const handleSend = async (newMessages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );

        const userMessage = newMessages[0].text.toLowerCase();

        if (userMessage.includes('hello') || userMessage.includes('hi')) {
            // Respond to greetings
            const botResponse = {
                _id: Math.random(),
                text: 'Hello! What is your name?',
                createdAt: new Date(),
                user: {
                    _id: 2, // Bot's user ID
                    name: 'Bot',
                },
            };

            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [botResponse])
            );
        } else if (userMessage.includes('@')) {
            // Respond to email address and ask for phone number
            const botResponse = {
                _id: Math.random(),
                text: 'Thank you for providing your email address. What is your phone number?',
                createdAt: new Date(),
                user: {
                    _id: 2, // Bot's user ID
                    name: 'Bot',
                },
            };

            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [botResponse])
            );
        } else if (userMessage.match(/\d{10}/)) {
            // Respond to phone number and ask for invoice ID
            const botResponse = {
                _id: Math.random(),
                text: 'Got it! What is your invoice number?',
                createdAt: new Date(),
                user: {
                    _id: 2, // Bot's user ID
                    name: 'Bot',
                },
            };

            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [botResponse])
            );
        } else {
            let botResponse;
            if (containsAllAlphabets(userMessage)) {
                // Default response for other messages
                botResponse = {
                    _id: Math.random(),
                    text: `Nice to meet you, ${userMessage}! What is your email address?`,
                    createdAt: new Date(),
                    user: {
                        _id: 2, // Bot's user ID
                        name: 'Bot',
                    },
                };
            } else {
                const resp = await fetch(`http://localhost:3001/chatbot?n=${userMessage}`);
                const respData = await resp.json();
                botResponse = {
                    _id: Math.random(),
                    text: `Thank you! This is your invoice: ${respData.data.data.img}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2, // Bot's user ID
                        name: 'Bot',
                    },
                };


            }

            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [botResponse])
            );
        }
    };
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0', // Change the left chat bubble background color
                    },
                    right: {
                        backgroundColor: '#007aff', // Change the right chat bubble background color
                    },
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: "10%",
                    borderColor: "transparent" // Change the input toolbar background color
                }}
            />
        );
    };

    const renderComposer = (props) => {
        return (
            <Composer
                {...props}
                textInputStyle={{
                    color: '#000000', // Change the text color in the input box
                }}
            />
        );
    };
    const renderAvatar = (props) => {
        const isUser = props.currentMessage.user._id === 1; // Replace 1 with your user's _id
        return (
            <Image
                source={isUser ? userAvatar : botAvatar}
                style={{
                    width: 40, // Adjust the width and height as needed
                    height: 40,
                    borderRadius: 20, // To make it round
                }}
            />
        );
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };
    return (
        <NativeBaseProvider>
            <Box style={!showChat?{position:"absolute", right:"5%", bottom:"15%"}:{marginBottom:"40%"}}>

                
                <Modal
                    isOpen={showChat}
                    onClose={toggleChat}

                >
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header >Quik-Chat</Modal.Header>
                        <Modal.Body >
                            <View style={styles.container}>

                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <GiftedChat
                                        messages={messages}
                                        onSend={(newMessages) => handleSend(newMessages)}
                                        user={{
                                            _id: 1, // User's ID
                                        }}
                                        renderBubble={renderBubble}
                                        renderInputToolbar={renderInputToolbar}
                                        renderComposer={renderComposer}
                                        renderAvatar={renderAvatar}
                                    />
                                </View>
                            </View>
                        </Modal.Body>

                    </Modal.Content>
                </Modal>




                <TouchableOpacity style={styles.floatingButton} onPress={toggleChat}>
                    <Image source={require('./image/bot.png')} />
                </TouchableOpacity>

            </Box>
        </NativeBaseProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 180,
    },
    chatContainer: {
        width: 400, // Set the width of the chat window
    },
    floatingButton: {
     
    },
});

export default Bot;