import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { BlogProvider } from './contexts/BlogContext';
import './index.css'
import { BookingProvider } from './contexts/Booking/index.tsx';
import { GOOGLE_AUTH_CLIENT_ID } from './utils/constant.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DataProvider>
        <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
            <AuthProvider>
                <BookingProvider>
                    <BlogProvider>
                        <App />
                    </BlogProvider>
                </BookingProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    </DataProvider>
    ,
)
