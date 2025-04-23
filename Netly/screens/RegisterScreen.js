import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik';
import { useRegistration } from '../context/registrationContext.js';
import { emailSchema, usernameSchema, birthdaySchema, passwordSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../schemas/schemaValidator.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-ui-datepicker'
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/adaptive-icon.png';
import { useAuth } from '../context/authContext.js';

let formData = {};

export const RegisterScreen1 = () => {
    const navigation = useNavigation();
    const { error, setError } = useRegistration();

    const onSubmit = data => {
        try {
            validateSchema(emailSchema, data.email);
            formData.email = data.email;
            navigation.navigate('Register2');
        } catch (err) {
            setError([err]);
        }
    };

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>setError([])
            }
            ]);;
    }, [error])

    return (
            <KeyboardAwareScrollView 
            style={formStyles.scrollView} 
            enableOnAndroid 
            keyboardShouldPersistTaps='handled' 
            contentContainerStyle={{
                alignItems: 'center',
                flexGrow: 1,
                maxHeight: '170%'
            }}>
            <Image source={Logo} style={ formStyles.logo } />
            <Text style={formStyles.principalWhiteText}>
                Let`s begin a new adventure!
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                Let us contact you, Just 4 steps to start!
            </Text>
                <Formik  
                    initialValues={{ email: '',}}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style = { formStyles.formContainer}>
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='email'
                                textAlign='left'
                                autoComplete='email'
                                keyboardType='email-address'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= 'Email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <TouchableOpacity
                                    style={formStyles.button }
                                    onPress={handleSubmit}>
                                    <Text
                                        style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                                        Next
                                    </Text>
                            </TouchableOpacity>
                            </View>
                        )}
                </Formik>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> {Alert.alert('Are You Sure?', 'Do you want to cancel the creation of your account?', [
                    {
                        text: 'Stay', onPress: ()=> {}
                    },
                    {
                        text: 'Yes', onPress: ()=> navigation.navigate('Login')
                    },
                    ])}}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Back To Login</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

export const RegisterScreen2 = () => {
    const navigation = useNavigation();
    const { setError, error } = useRegistration();
    const [ birthday, setBirthday ] = useState();

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>setError([])
            }
            ]);;
    }, [error])

    const onSubmit = data => {
        try {
            if(!data.username) throw 'Username Required';
            if(!birthday) throw 'Birth date Required';
            if(!data.gender) throw 'Gender Required';
            if(!data.nationality) throw 'Nationality Required';
            validateSchema(usernameSchema, data.username)
            const date = new Date(birthday);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            validateSchema(birthdaySchema, `${year}-${month}-${day}`)
            data.birthday = `${year}-${month}-${day}`;
            formData.username = data.username;
            formData.birthday = data.birthday;
            formData.gender = data.gender;
            formData.nationality = data.nationality;
            navigation.navigate('Register3');
        } catch (err) {
            setError([err])
        }
    };

    return (
            <KeyboardAwareScrollView 
            style={formStyles.scrollView} 
            enableOnAndroid 
            keyboardShouldPersistTaps='handled' 
            contentContainerStyle={{
                alignItems: 'center',
                flexGrow: 1,
                maxHeight: '210%',
            }}>
            <Image source={Logo} style={ formStyles.logo } />
            <Text style={formStyles.principalWhiteText}>
                Now some of yourself to share!
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                Just 3 steps to start!...
            </Text>
            <Formik  
                    initialValues={{ username: '', gender: '', nationality: '' }}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style = { formStyles.formContainer}>
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='text'
                                textAlign='left'
                                autoComplete='username'
                                keyboardType='default'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= 'Username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <View style={{
                                width: '100%',
                                height: 450,
                                margin: 20, 
                                borderRadius: 8, 
                                borderColor: 'rgb(149, 228, 196)', 
                                borderWidth: 1, 
                                padding: '5%', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                flexDirection: 'column'
                                }}>
                                <Text 
                                style={
                                    {
                                        textAlign: 'center',
                                        color: 'rgb(255, 255, 255)',
                                        fontWeight: '600', fontSize: 20,
                                        margin: 5,
                                        paddingHorizontal: '5%',
                                        margin: 10
                                    }}>
                                    Your Birthday
                                </Text>
                                <DateTimePicker
                                    mode='single'
                                    date={birthday}
                                    onChange={(params) => setBirthday(params.date)}
                                    calendarTextStyle={{fontWeight: '500', color: 'rgb(149, 228, 196)', fontSize: 16,}}
                                    selectedTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500,}}
                                    selectedItemColor='rgb(44, 73, 48)'
                                    headerContainerStyle={{ borderRadius: 8, borderBottomWidth: 0, backgroundColor: 'rgb(44, 73, 48)',}}
                                    headerTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500,}}
                                    headerButtonColor='rgb(255, 255, 255)'
                                    headerButtonSize={20}
                                    dayContainerStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                    todayContainerStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                    todayTextStyle={{color: 'rgb(149, 228, 196)',}}
                                    monthContainerStyle={{backgroundColor:'transparent', borderWidth: 1, borderRadius: 8, borderColor: 'rgb(149, 228, 196)',}}
                                    yearContainerStyle={{backgroundColor:'transparent', borderWidth: 1, borderRadius: 8, borderColor: 'rgb(149, 228, 196)',}}
                                    weekDaysContainerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                    weekDaysTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500}}
                                />
                            </View>
                            <Text style= {{color: 'rgb(149, 228, 196)', fontWeight: '500', margin: 5, fontSize: 16}}>Gender: {values.gender}</Text>
                            <View style={formStyles.pickerContainer}>
                                <Picker
                                    style={formStyles.picker}
                                    selectedValue={values.gender}
                                    onValueChange={handleChange('gender')}
                                >
                                    <Picker.Item style={formStyles.pickerOption}  label='Chose a gender' value='' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Masculine' value='Masculine' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Female' value='Female' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Non-binary' value='Non-binary' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Other' value='Other' />
                                </Picker>
                            </View>
                            
                            <Text style= {{color: 'rgb(149, 228, 196)', fontWeight: '500', margin: 5,  fontSize: 16}}>Nationality: {values.nationality}</Text>
                            <View style={formStyles.pickerContainer}>
                                <Picker
                                    style={formStyles.picker}
                                    selectedValue={values.nationality}
                                    onValueChange={handleChange('nationality')}
                                >
                                    <Picker.Item style={formStyles.pickerOption}  label='Chose a country' value='' />
                                    <Picker.Item style={formStyles.pickerOption}  label='South Korea' value='South Korea' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Japan' value='Japan' />
                                    <Picker.Item style={formStyles.pickerOption}  label='China' value='China' />
                                    <Picker.Item style={formStyles.pickerOption}  label='United States' value='United States' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Italy' value='Italy' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Germany' value='Germany' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Russia' value='Russia' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Spain' value='Spain' />
                                    <Picker.Item style={formStyles.pickerOption}  label='Mexico' value='Mexico' />
                                </Picker>
                            </View>
                            
                            <TouchableOpacity
                                    style={ formStyles.button }
                                    onPress={handleSubmit}>
                                    <Text
                                        style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                                        Next
                                    </Text>
                            </TouchableOpacity>
                            </View>
                        )}
                </Formik>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> {Alert.alert('Are You Sure?', 'Do you want to cancel the creation of your account?', [
                    {
                        text: 'Stay', onPress: ()=> {}
                    },
                    {
                        text: 'Yes', onPress: ()=> navigation.navigate('Login')
                    },
                    ])}}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Back To Login</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

export const RegisterScreen3 = () => {
    const navigation = useNavigation();
    const { error, setError } = useRegistration();

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>setError([])
            }
            ]);;
    }, [error])

    const onSubmit = data => {
        try {
            if(!data.password) throw 'Password Required';
            if(!data.confirmPassword) throw 'Password Confirmation Required';
            validateSchema(passwordSchema, data.password);
            if(data.password !== data.confirmPassword) throw 'There are two different passwords given';
            formData.password = data.password;
            navigation.navigate('Confirmation');
        } catch (err) {
            setError([err])
        }
    };

    return (
            <KeyboardAwareScrollView 
            style={formStyles.scrollView} 
            enableOnAndroid 
            keyboardShouldPersistTaps='handled' 
            contentContainerStyle={{
                alignItems: 'center',
                flexGrow: 1,
                maxHeight: '210%'
            }}>
            <Image source={Logo} style={ formStyles.logo } />
            <Text style={formStyles.principalWhiteText}>
                Careful here, this information is not shareable!
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                Almost, Just 2 steps to start!...
            </Text>
                <Formik  
                    initialValues={{ password: '', confirmPassword: '' }}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style = { formStyles.formContainer}>
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='text'
                                textAlign='left'
                                textContentType='password'
                                secureTextEntry= {true}
                                autoComplete='password'
                                keyboardType='visible-password'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= 'Password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <TextInput
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='text'
                                textAlign='left'
                                textContentType='password'
                                secureTextEntry= {true}
                                autoComplete='password'
                                keyboardType='visible-password'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= 'Confirm Password'
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            <TouchableOpacity
                                    style={ formStyles.button }
                                    onPress={handleSubmit}>
                                    <Text
                                        style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                                        Next
                                    </Text>
                            </TouchableOpacity>
                            </View>
                        )}
                </Formik>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> {Alert.alert('Are You Sure?', 'Do you want to cancel the creation of your account?', [
                    {
                        text: 'Stay', onPress: ()=> {}
                    },
                    {
                        text: 'Yes', onPress: ()=> navigation.navigate('Login')
                    },
                    ])}}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Back To Login</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

export const ConfirmationScreen = () => {

    const navigation = useNavigation();
    const { error, setError } = useRegistration();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ onchangeEmail, setOnchangeEmail ] = useState(false);
    const [ onchangeUsername, setOnchangeUsername ] = useState(false);
    const [ onchangeBirthday, setOnchangeBirthday ] = useState(false);
    const [ onchangeGender, setOnchangeGender ] = useState(false);
    const [ onchangeNationality, setOnchangeNationality ] = useState(false);
    const [ showModal, setShowModal ] = useState(false)
    const [ birthday, setBirthday ] = useState(new Date(formData.birthday));
    const [ editedGender, setEditedGender ] = useState('');
    const [ editedNationality, setEditedNationality ] = useState('');

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>setError([])
            }
            ]);
    }, [error])

    const editData = (data)=> {
        try {
            if(data.email) {
                validateSchema(emailSchema, data.email);
                formData.email = data.email;
                setShowModal(false)
                setOnchangeEmail(false)
            }
            if(data.username) {
                validateSchema(usernameSchema, data.username);
                formData.username = data.username;
                setShowModal(false)
                setOnchangeUsername(false)
            }
            if(data.birthday) {
                const date = new Date(data.birthday);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                validateSchema(birthdaySchema, `${year}-${month}-${day}`)
                formData.birthday = `${year}-${month}-${day}`;
                setShowModal(false)
                setOnchangeBirthday(false)
            }
            if(data.gender) {
                console.log(formData.gender)
                if(data.gender === '') throw 'Gender Required';
                formData.gender = data.gender;
                setShowModal(false)
                onchangeGender(false)
            }
            if(data.nationality) {
                if(data.nationality === '') throw 'Nationality Required';
                formData.nationality = data.nationality;
                setShowModal(false)
                onchangeNationality(false)
            }
        } catch (err) {
            setError([err])
        }
    }

    const onSubmit = () => {
        Object.entries(formData).forEach(([key, value]) => {
            if(key !== 'phoneNumber') {
                if(value === '') return setError([`You are missing your ${key}`]);
            }
        });
        navigation.navigate('Verification')
    }

    return (
        <ScrollView 
            style={formStyles.scrollView} 
            contentContainerStyle={{
                alignItems: 'center',
                paddingHorizontal:'5%'
            }}>
            <Image source={Logo} style={ formStyles.logo } />
            <Text style={formStyles.principalWhiteText}>
                Your Data Summary: 
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                You can edit wrong information
            </Text>
            <Card style={formStyles.summaryCard}>
                <Card.Title title='Contact:' titleStyle={[formStyles.principalWhiteText, {textAlign: 'left'}]} />
                <Card.Content style={formStyles.cardContent}>
                    <View style={formStyles.cardSection}>
                        <Text style={formStyles.cardLabel}>Email:</Text>
                        <Text style={formStyles.cardValue}>{formData.email}</Text>
                    </View>
                    <TouchableOpacity
                        style={formStyles.cardCircularButton}
                        onPress={() => { 
                            setOnchangeEmail(true)
                            setShowModal(true)
                        }}
                    >
                        <Feather name='edit' size={20} color='rgb(255, 255, 255)' />
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            <Card style={formStyles.summaryCard}>
                <Card.Title title='User Data:' titleStyle={[formStyles.principalWhiteText, {textAlign: 'left'}]} />
                <Card.Content style={formStyles.cardContent}>
                    <View style={formStyles.cardSection}>
                        <Text style={formStyles.cardLabel}>UserName:</Text>
                        <Text style={formStyles.cardValue}>{formData.username}</Text>
                    </View>
                    <TouchableOpacity
                        style={formStyles.cardCircularButton}
                        onPress={() => { 
                            setOnchangeUsername(true)
                            setShowModal(true)
                        }}
                    >
                        <Feather name='edit' size={20} color='rgb(255, 255, 255)' />
                    </TouchableOpacity>
                </Card.Content>
                <Divider style= {formStyles.cardDivider}/>
                <Card.Content style={formStyles.cardContent}>
                    <View style={formStyles.cardSection}>
                        <Text style={formStyles.cardLabel}>Birthday:</Text>
                        <Text style={formStyles.cardValue}>{formData.birthday}</Text>
                    </View>
                    <TouchableOpacity
                        style={formStyles.cardCircularButton}
                        onPress={() => { 
                            setOnchangeBirthday(true)
                            setShowModal(true)
                        }}
                    >
                        <Feather name='edit' size={20} color='rgb(255, 255, 255)' />
                    </TouchableOpacity>
                </Card.Content>
                <Divider style= {formStyles.cardDivider}/>
                <Card.Content style={formStyles.cardContent}>
                    <View style={formStyles.cardSection}>
                        <Text style={formStyles.cardLabel}>Gender:</Text>
                        <Text style={formStyles.cardValue}>{formData.gender}</Text>
                    </View>
                    <TouchableOpacity
                        style={formStyles.cardCircularButton}
                        onPress={() => { 
                            setOnchangeGender(true)
                            setShowModal(true)
                        }}
                    >
                        <Feather name='edit' size={20} color='rgb(255, 255, 255)' />
                    </TouchableOpacity>
                </Card.Content>
                <Divider style= {formStyles.cardDivider}/>
                <Card.Content style={formStyles.cardContent}>
                    <View style={formStyles.cardSection}>
                        <Text style={formStyles.cardLabel}>Nationality:</Text>
                        <Text style={formStyles.cardValue}>{formData.nationality}</Text>
                    </View>
                    <TouchableOpacity
                        style={formStyles.cardCircularButton}
                        onPress={() => { 
                            setOnchangeNationality(true)
                            setShowModal(true)
                        }}
                    >
                        <Feather name='edit' size={20} color='rgb(255, 255, 255)'/>
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            <Card style={ formStyles.summaryCard }>
                <Card.Title title='Private Data:' titleStyle={ [formStyles.principalWhiteText, {textAlign: 'left'}] } />
                <Card.Content style={ formStyles.cardContent }>
                    <View style={ formStyles.cardSection }>
                        <Text style={ formStyles.cardLabel }>Password:</Text>
                        <TextInput 
                            autoCapitalize='none'
                            editable={ false }
                            secureTextEntry={ showPassword? false:true }
                            textAlign='left'
                            style ={ formStyles.cardValue }
                            value={formData.password}
                            />
                    </View>
                    {
                        showPassword ? 
                            <TouchableOpacity
                                style={ formStyles.cardCircularButton }
                                onPress={ ()=> setShowPassword(!showPassword) }
                            >
                                <Entypo name='eye' size={20} color='rgb(255, 255, 255)' />
                            </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={formStyles.cardCircularButton}
                            onPress={ ()=> setShowPassword(!showPassword) }
                        >
                            <Entypo name='eye-with-line' size={20} color='rgb(255, 255, 255)' />
                        </TouchableOpacity>
                    }
                </Card.Content>
            </Card>

            <TouchableOpacity
                style={ formStyles.button }
                onPress={()=> onSubmit()}
            >
                <Text
                    style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                        Verify Account
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> {Alert.alert('Are You Sure?', 'Do you want to cancel the creation of your account?', [
                    {
                        text: 'Stay', onPress: ()=> {}
                    },
                    {
                        text: 'Yes', onPress: ()=> navigation.navigate('Login')
                    },
                    ])}}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Back To Login</Text>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={showModal}
                onRequestClose={ () => setShowModal(!showModal) }
            >
                <View style={ModalStyles.centeredView}>
                <View style={ModalStyles.topView}>
                    <TouchableOpacity
                        onPress={()=>{
                            setShowModal(false)
                            setOnchangeEmail(false)
                            setOnchangeUsername(false)
                            setOnchangeBirthday(false)
                            setOnchangeGender(false)
                            setOnchangeNationality(false)
                        }}
                    >
                        <AntDesign name='close' size={30} color='rgb(149, 228, 196)' />
                    </TouchableOpacity>
                        </View>
                    <View style={ModalStyles.modalView}>
                        {onchangeEmail &&
                                <Formik  
                                initialValues={{ email: formData.email}}
                                onSubmit={editData}>
                                {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style = {{ width: '100%', height: '100%', justifyContent:'space-around', alignItems: 'center' }}>
                                    <Text style={ModalStyles.inputLabel}>New Email</Text>
                                    <TextInput 
                                        autoCapitalize='none'
                                        contextMenuHidden = {true}
                                        inputMode='email'
                                        textAlign='left'
                                        autoComplete='email'
                                        keyboardType='email-address'
                                        style ={ ModalStyles.input }
                                        placeholderTextColor='rgb(255, 255, 255)'
                                        placeholder= 'Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    <TouchableOpacity
                                        style={ModalStyles.button}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={{fontSize: 16, fontWeight: 500, color: 'rgb(149, 228, 196)'}}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                    )}
                            </Formik>
                        }
                        {onchangeUsername && 
                            <Formik  
                                initialValues={{ username: formData.username}}
                                onSubmit={editData}>
                                {({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <View style = {{ width: '100%', height: '100%', justifyContent:'space-around', alignItems: 'center' }}>
                                        <Text style={ModalStyles.inputLabel}>New Username</Text>
                                        <TextInput 
                                            autoCapitalize='none'
                                            contextMenuHidden = {true}
                                            inputMode='text'
                                            textAlign='left'
                                            autoComplete='username'
                                            keyboardType='default'
                                            style ={ ModalStyles.input }
                                            placeholderTextColor='rgb(255, 255, 255)'
                                            placeholder= 'Username'
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                    />
                                        <TouchableOpacity
                                            style={ModalStyles.button}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={{fontSize: 16, fontWeight: 500, color: 'rgb(149, 228, 196)'}}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        }
                        {onchangeBirthday &&
                            <View style={{width: '100%', height: '100%', justifyContent:'space-around', alignItems: 'center' }}>
                                <View style={{
                                            width: '100%',
                                            height: 450,
                                            margin: 20, 
                                            borderRadius: 8, 
                                            borderColor: 'rgb(149, 228, 196)', 
                                            borderWidth: 1, 
                                            padding: '5%', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            flexDirection: 'column'
                                            }}>
                                            <Text 
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    color: 'rgb(255, 255, 255)',
                                                    fontWeight: '600', fontSize: 20,
                                                    margin: 5,
                                                    paddingHorizontal: '5%',
                                                    margin: 10
                                                }}>
                                                Your Birthday
                                            </Text>
                                            <DateTimePicker
                                                mode='single'
                                                date={birthday}
                                                onChange={(params) => setBirthday(params.date)}
                                                calendarTextStyle={{fontWeight: '500', color: 'rgb(149, 228, 196)', fontSize: 16,}}
                                                selectedTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500,}}
                                                selectedItemColor='rgb(44, 73, 48)'
                                                headerContainerStyle={{ borderRadius: 8, borderBottomWidth: 0, backgroundColor: 'rgb(44, 73, 48)',}}
                                                headerTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500,}}
                                                headerButtonColor='rgb(255, 255, 255)'
                                                headerButtonSize={20}
                                                dayContainerStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                                todayContainerStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                                todayTextStyle={{color: 'rgb(149, 228, 196)',}}
                                                monthContainerStyle={{backgroundColor:'transparent', borderWidth: 1, borderRadius: 8, borderColor: 'rgb(149, 228, 196)',}}
                                                yearContainerStyle={{backgroundColor:'transparent', borderWidth: 1, borderRadius: 8, borderColor: 'rgb(149, 228, 196)',}}
                                                weekDaysContainerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: 'rgba(149, 228, 196, 0.5)',}}
                                                weekDaysTextStyle={{color: 'rgb(255, 255, 255)', fontSize: 16, fontWeight: 500}}
                                            />
                                        </View>
                                <TouchableOpacity
                                    style={ModalStyles.button}
                                    onPress={editData({birthday: birthday})}
                                >
                                    <Text style={{fontSize: 16, fontWeight: 500, color: 'rgb(149, 228, 196)'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            onchangeGender &&
// HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            <View style = { { width: '100%', height: '100%', justifyContent:'space-around', alignItems: 'center' } }>
                                <Text style= { ModalStyles.inputLabel }>New Gender</Text>
                                <Text style= { ModalStyles.inputLabel }>Your Gender: { editedGender }</Text>
                                <View style={ formStyles.pickerContainer }>
                                    <Picker
                                        style={ ModalStyles.picker }
                                        selectedValue=''
                                        onValueChange={ params => setEditedGender(params) }
                                    >
                                        <Picker.Item style={ ModalStyles.pickerOption }  label='Chose a gender' value='' />
                                        <Picker.Item style={ ModalStyles.pickerOption }  label='Masculine' value='Masculine' />
                                        <Picker.Item style={ ModalStyles.pickerOption }  label='Female' value='Female' />
                                        <Picker.Item style={ ModalStyles.pickerOption }  label='Non-binary' value='Non-binary' />
                                        <Picker.Item style={ ModalStyles.pickerOption }  label='Other' value='Other' />
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={ModalStyles.button}
                                    onPress={editData({gender: editedGender})}
                                >
                                    <Text style={{fontSize: 16, fontWeight: 500, color: 'rgb(149, 228, 196)'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {
                            onchangeNationality && 
                            <Formik  
                                initialValues={ {nationality: editedNationality, } }
                            >
                                {({ values }) => ( 
                                    <View style = { { width: '100%', height: '100%', justifyContent:'space-around', alignItems: 'center' } }>
                                        <Text style= { ModalStyles.inputLabel }>New Nationality</Text>
                                        <View style={formStyles.pickerContainer}>
                                            <Picker
                                                style={ ModalStyles.picker }
                                                selectedValue={ values.nationality }
                                                onValueChange={ param => setEditedNationality(param) }
                                            >
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Chose a country' value='' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='South Korea' value='South Korea' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Japan' value='Japan' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='China' value='China' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='United States' value='United States' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Italy' value='Italy' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Germany' value='Germany' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Russia' value='Russia' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Spain' value='Spain' />
                                                <Picker.Item style={ModalStyles.pickerOption}  label='Mexico' value='Mexico' />
                                                
                                            </Picker>
                                        </View>
                                        <TouchableOpacity
                                            style={ModalStyles.button}
                                            onPress={editData({nationality: editedNationality})}
                                        >
                                            <Text style={{fontSize: 16, fontWeight: 500, color: 'rgb(149, 228, 196)'}}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        }
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
};

export const VerificationScreen = () => {
    const { signup } = useAuth();
    const { setError } = useRegistration();

    const registerUser = () => {
        try {
            validateSchema(emailSchema, formData.email);
            validateSchema(usernameSchema, formData.username)
            validateSchema(birthdaySchema, formData.birthday)
            validateSchema(passwordSchema, formData.password)
            signup(formData);
        } catch (err) {
            setError([err]);
        }
    }

    return (
        <KeyboardAwareScrollView style={formStyles.scrollView}>
            {/* <Text style={formStyles.principalWhiteText}>
                Verify Your Email
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                We will send you a code to your email: {formData.email}
            </Text>
            <View style= {formStyles.summaryCard}>
                <Text style={formStyles.secondaryWhiteText}>
                    Enter the code here
                </Text> */}
                {/* <Formik  
                    initialValues={{ n1: '', n2: '', n3: '', n4: '', n5: ''  }}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style = { formStyles.formContainer}>
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n1')}
                                onBlur={handleBlur('n1')}
                                value={values.n1}
                            />

                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n2')}
                                onBlur={handleBlur('n2')}
                                value={values.n2}
                            />
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n3')}
                                onBlur={handleBlur('n3')}
                                value={values.n3}
                            />
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n3')}
                                onBlur={handleBlur('n3')}
                                value={values.n3}
                            />
                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n4')}
                                onBlur={handleBlur('n4')}
                                value={values.n4}
                            />

                            <TextInput 
                                autoCapitalize='none'
                                contextMenuHidden = {true}
                                inputMode='numeric'
                                textAlign='center'
                                keyboardType='numeric'
                                style ={ formStyles.input }
                                placeholderTextColor='rgb(149, 228, 196)'
                                placeholder= ''
                                onChangeText={handleChange('n5')}
                                onBlur={handleBlur('n5')}
                                value={values.n5}
                            />
                            </View>
                        )}
                </Formik> */}
            {/* </View> */}
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={ () => registerUser()}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >...</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

const formStyles = StyleSheet.create({
    scrollView: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgb(36, 40, 27)',
    },
    formContainer : {
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        paddingHorizontal: '5%',
        backgroundColor: 'transparent',
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 4,
        resizeMode: 'cover',
    },
    principalWhiteText: {
        textAlign: 'center',
        color: 'rgb(255, 255, 255)',
        fontWeight: '700',
        fontSize: 22,
        margin: 5,
        paddingHorizontal: '5%',
    },
    secondaryWhiteText: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
        fontSize: 16,
        margin: 5,
        paddingHorizontal: '5%',
    },
    input: {
        fontSize: 16,
        width: '90%',
        height: '20',
        padding: '3%',
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(44, 73, 48, 0.2)', 
        margin: 15,
        borderRadius: 8,
        fontWeight: '500',
        color: 'rgb(149, 228, 196)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
        padding: '3%',
        backgroundColor: 'rgb(44, 73, 48)',
        borderColor: 'rgb(149, 228, 196)',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 8,
    },
    datePicker: {
        width: 200,
    },
    pickerContainer: {
        margin: 10,
        width: '90%',
        height: 'auto',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgb(44, 73, 48)',
        color: 'rgb(149, 228, 196)',
    },
    pickerOption : {
        width: '90%',
        height: 'auto',
        backgroundColor: 'rgb(44, 73, 48)',
        color: 'rgb(149, 228, 196)',
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 'auto',
        padding: '3%',
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(20, 153, 133, 0.1)', 
        margin: '25%',
        borderRadius: 8,
    },
    summaryCard : {
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        padding: '3%',
        margin: 20,
        backgroundColor: 'rgba(20, 153, 133, 0.1)',
        borderRadius: 8,
        borderColor: 'transparent',
        borderWidth: 0
    },
    cardContent: {
        display: 'flex', 
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardSection: {
        marginVertical: 20,
        backgroundColor: 'transparent'
    },
    cardDivider: {
        borderBottomColor: 'rgb(149, 228, 196)',
        borderBottomWidth: 1,
        marginVertical: 5
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(149, 228, 196)',
    },
    cardValue: {
        fontSize: 16,
        color: 'rgb(255, 255, 255)'
    },
    cardCircularButton : {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 999,
        backgroundColor: 'rgb(36, 40, 27)',
        borderColor: 'rgb(149, 228, 196)',
        borderWidth: 1,
    }
});

const ModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    topView : {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgb(44, 73, 48)',
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        width: '80%',
        padding: '5%',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
    },
    modalView: {
        display: 'flex',
        backgroundColor: 'rgb(44, 73, 48)',
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgb(149, 228, 196)',
        padding: '5%',
        height: '50%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        fontSize: 16,
        width: '90%',
        height: '15',
        padding: '3%',
        borderBottomWidth: 1,
        borderBottomColor:'rgb(149, 228, 196)', 
        backgroundColor:'transparent', 
        margin: 20,
        fontWeight: '500',
        color: 'rgb(255, 255, 255)',
    },
    inputLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(149, 228, 196)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
        padding: '3%',
        backgroundColor: 'rgb(36, 40, 27)',
        borderRadius: 8,
        marginTop: 20,
    },
    picker: {
        fontSize: 16,
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgb(36, 40, 27)',
        color: 'rgb(255, 255, 255)',
    },
    pickerOption : {
        fontSize: 16,
        width: '90%',
        height: 'auto',
        backgroundColor: 'rgb(36, 40, 27)',
        color: 'rgb(149, 228, 196)',
        
    },
});