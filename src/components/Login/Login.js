import React,{useState,useEffect} from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css'

const Login = (props) => {

    const [enteredEmail, setEnteredEmail] = useState(''); // поле ввода емайл
    const [emailIsValid, setEmailIsValid] = useState(); // проверка поля true/false
    const [enteredPassword, setEnteredPassword] = useState(''); // поле ввода пароль
    const [passwordIsValid, setPasswordIsValid] = useState(); // проверка поля true/false
    const [formIsValid, setFormIsValid] = useState(false); // проверка полей true/false емайл и пароль

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('effect works every time when the state updated')
            setFormIsValid (
                enteredEmail.includes('@') && enteredPassword.trim().length > 6
            );
        }, 3000);

        return () => {
            console.log('clean up the timer');
            clearTimeout(timer);
        }
    }, [enteredEmail, enteredPassword])

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);

        // setFormIsValid (
        //     e.target.value.includes('@') && enteredPassword.trim().length > 6
        // )
    }

    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value);

        // setFormIsValid (
        //     e.target.value.trim().length > 6 && enteredEmail.includes('@')
        // )
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.onLogin(enteredEmail,enteredPassword)
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailIsValid === false ? classes.invalid : ''
                    }`}
                >
                <label htmlFor="email">E-Mail</label>
                <input 
                    type='email'
                    id='email'
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                    onBlur={validateEmailHandler}
                />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input 
                        type='password'
                        id='password'
                        onChange={passwordChangeHandler}
                        value={enteredPassword}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type='submit' className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}
export default Login;