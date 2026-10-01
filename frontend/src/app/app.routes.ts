import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Studentdashboard } from './studentdashboard/studentdashboard';

export const routes: Routes = [
    { 
        path: '', component: Signup
    },
    {
        path : 'login',
        component : Login
    },
    {
        path: 'signup',
        component: Signup
    },{
        path: 'studentdashboard',
        component: Studentdashboard
    }
         
];
