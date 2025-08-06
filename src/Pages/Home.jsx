import React from 'react';
import Banner from '../Component/Banner';
import FeaturedDonations from '../Component/FeaturedDonations';
import ImpactStats from '../Component/ExtraSections/ImpactStats';
import CommunityStories from '../Component/ExtraSections/CommunityStories';
import LatestCharityRequests from '../Component/LatestCharityRequests';

const Home = () => {
    return (
        <div >
         <Banner></Banner>
         <FeaturedDonations></FeaturedDonations>
         <LatestCharityRequests></LatestCharityRequests>
         <CommunityStories></CommunityStories>
         <ImpactStats></ImpactStats>
        </div>
    );
};

export default Home;