import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';
import NewCard from './NewCard';
import { useColorMode } from '@chakra-ui/react';
import { songs } from '../data/songs';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const CardCarousel = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <StyledWrapper>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        direction={'vertical'}
        mousewheel={true}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[EffectCards, Mousewheel, Pagination]}
        className="mySwiper"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.id}>
            <NewCard song={song} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 420px;
  height: 100%;
  padding-left: 100px;
  position: relative;
  margin: 0 auto;
  margin-top: 180px;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    transform-origin: center bottom;
    transform: translateZ(0);
    transition: transform 0.3s;

    /* Ensure card contents don't overflow */
    > div {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-slide-active {
    transform: translateZ(30px);
  }

  .swiper-slide-prev {
    transform: translate3d(10, -20%, 0) scale(0.9);
    opacity: 0;
  }

  .swiper-slide-next {
    transform: translate3d(0, 20%, 0) scale(0.9);
    opacity: 0.4;
  }

  /* Pagination bullets */
  .swiper-pagination {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: auto !important;
  }

  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5);
    width: 6px;
    height: 6px;
    transition: all 0.3s;
    opacity: 0.5;
    
    &-active {
      background: #fff;
      transform: scale(1.2);
      opacity: 1;
    }
  }

  /* Custom perspective effect */
  .swiper-wrapper {
    perspective: 1000px;
    perspective-origin: center center;
  }

  /* Add subtle glow effect to active slide */
  .swiper-slide-active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 18px;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .swiper-slide-active:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    height: 450px;
  }
`;

export default CardCarousel; 