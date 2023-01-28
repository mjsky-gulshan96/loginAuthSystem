import React from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Profile = ({user}) => {

    function handleLogout (){
        axios({
            method: 'get',
            url: 'http://localhost:8000/account/Logout'
        }).then(function(res){
            sessionStorage.removeItem('user');
        }).catch(function(err){
            console.log(err);
        })
    }
    return (
        <>
            <Navbar />
            <div>Hello {user.username}</div>
            <button onClick={handleLogout}>logOut</button>
        </>
    );
}

export default Profile;
