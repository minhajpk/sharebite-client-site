import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";



const communityStories = [
  {
    name: "Chef Anika",
    title: "Owner, Green Spoon",
    text: "Thanks to this platform, we donated surplus meals to shelters. We never imagined we'd feed so many and reduce food waste at the same time.",
  },
  {
    name: "Rahim Foundation",
    title: "Charity Organization",
    text: "These meals truly saved lives during the crisis. It's more than just food — it's hope for hundreds of families.",
  },
  {
    name: "Mama’s Kitchen",
    title: "Local Restaurant Partner",
    text: "Joining this initiative helped us give back to the community. It’s rewarding beyond business—it’s personal now.",
  },
  {
    name: "Shapla Shelter",
    title: "NGO Worker",
    text: "The regular donations helped us sustain meals for our children and elderly residents. We’re truly grateful.",
  },
  {
    name: "Safe Plate Initiative",
    title: "Food Recovery Volunteer Group",
    text: "The platform makes food rescue efficient and impactful. It's now a key part of our volunteer work.",
  },
  {
    name: "Safe Plate Initiative",
    title: "Food Recovery Volunteer Group",
    text: "The platform makes food rescue efficient and impactful. It's now a key part of our volunteer work.",
  },
  {
    name: "Safe Plate Initiative",
    title: "Food Recovery Volunteer Group",
    text: "The platform makes food rescue efficient and impactful. It's now a key part of our volunteer work.",
  },
];

const CommunityStoriesSlider = () => {
  return (
    <section className=" max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        {/* <img src={image} alt="Community Impact" className="mx-auto mb-4" /> */}
        <h2 className="text-3xl font-bold text-[#0e606e]">
          What Our Community Is Saying
        </h2>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Real stories from the restaurants and organizations creating impact through food donation.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-4xl mx-auto"
      >
        {communityStories.map((story, index) => (
          <SwiperSlide
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-sm"
          >
            <div className="text-teal-600 text-3xl mb-4">
              {/* <img src={image2} alt="Quote" /> */}
            </div>
            <p className="text-gray-700 text-sm mb-6">{story.text}</p>
            <hr className="border-dashed border-t-2 border-gray-300 mb-4" />
            <div>
              <div className="text-base font-semibold text-gray-800">{story.name}</div>
              <div className="text-sm text-gray-500">{story.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CommunityStoriesSlider;
