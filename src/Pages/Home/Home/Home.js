import React from 'react';
import Navigation from '../../../Shared/Navigation/Navigation';
import Products from './Products/Products';
import Banner from '../Banner/Banner';
import UserReview from '../UserReview/UserReview';
import Footer from '../../../Shared/Footer/Footer';
import GetMail from '../GetMail/GetMail';


const Home = () => {
    return (

        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Products></Products>
            <UserReview></UserReview>
            <GetMail></GetMail>
            <Footer></Footer>

        </div>
    );
};

export default Home;