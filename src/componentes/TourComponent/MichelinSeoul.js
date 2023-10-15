import React from 'react';
import seoul_m from "../../assets/michelin/seoul_m.png";
import seoul_list from "../../assets/michelin/seoul_list.png";
import mosu from "../../assets/michelin/mosu.png";
import mosu_logo from "../../assets/michelin/mosu_logo.png";
import "./MichelinSeoul.css";

function MichelinSeoul() {
    return (
        <div className="zone-container">
            <img className="img-seoul" src={seoul_m} alt="Loading.."></img>
            <img className="img-list" src={seoul_list} alt="Loading.."></img>
            <div className="background-blur" url={mosu}>
                <img className="michelin-poster" src={mosu_logo} alt="Loading.."/>
                <div className='text-list'>
                    <h2>모수</h2>
                    <h2>용산구 이태원로 55가길 45, Seoul, 대한민국</h2>
                    <h3>미쉐린 가이드의 의견</h3>
                    <h3>세 개의 별: 탁월한 요리</h3>
                    <h3>다양한 문화가 공존하는 샌프란시스코에서 보여주었던 음식과 차별화된 다양성을 선보이는 한남동 모수. 안성재 셰프는 재료의 섬세한 뉘앙스를 감각적으로 표현해내는 장기를 지니고 있다. 1스타 모수 샌프란시스코에서 선보였던 우엉 메뉴는 어머니가 만들어주시던 반찬에서 영감을 얻은 요리로, 얇게 깎은 우엉에 시럽을 발라 말리는 과정을 수차례 반복해 바삭한 식감을 자랑한다. 섬세하고 단아한 이곳의 요리와 잘 어울리는 와인 페어링 또한 근사한 다이닝 경험을 선사할 것이다.
                    </h3>
                    <button> 웹사이트 이동 </button>
                </div>
                
            </div>
        </div>
    );
}

export default MichelinSeoul;
