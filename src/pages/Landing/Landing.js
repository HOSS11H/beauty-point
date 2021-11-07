import { useEffect } from 'react';

import  '../../assets/css/all.min.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/owl.theme.css';
import '../../assets/css/style.css';
import '../../assets/css/rtl.css';
import '../../assets/css/responsive.css';

import image1 from '../../assets/img/1.png'
import image2 from '../../assets/img/2.png'
import image3 from '../../assets/img/3.png'
import image4 from '../../assets/img/4.png'
import image5 from '../../assets/img/5.png'


import {appendScript} from '../../assets/load';


const Landing = props => {


    useEffect( () => {
        const fPath = '/assests/'

        const scripts = [
            fPath + 'js/jquery-3.6.0.min.js',
            fPath + 'js/bootstrap-bundle.min.js',
            fPath + 'js/owl.carousel.min.js',
            fPath + 'js/jquery.waypoints.min.js',
            fPath + 'js/tilt.jquery.min.js',
            fPath + 'js/scroll.js',
            fPath + 'js/all.min.js',
            fPath + 'js/script.js',
        ]

        for (let i = 0; i < scripts.length; i++) {
            appendScript(scripts[i])
        }

    }, [ ] )
    
    
    return (
        <div class="home-style three rtl" data-spy="scroll" data-target=".navbar" data-offset="80">
            <nav className="navbar navbar-expand-lg navbar-light theme-nav fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="https://beautypoint.app">
                        <img src="./assets/img/logo_white.png" className="logo-white" alt="logo" />
                        <img src="https://beautypoint.app/img/logo.png" className="d-none logo-dark" alt="logo" />
                    </a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse default-nav collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto" id="mymenu">
                            <li className="nav-item">
                                <a className="nav-link  active " href="/">الرئيسية</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">من نحن</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#feature">المميزات</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#screenshot">الشاشات</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://beautypoint.app/home">صفحة الجميلات </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://beautypoint.app/login">الصالونات </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#download">تحميل</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href="https://beautypoint.app/register">أنضم الينا </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="home home-three vertical-scrolling" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-12">
                            <div className="home-contain">
                                <div className="text-white">
                                    <div className="contain">
                                        <h1 className="text-white">تطبيق بيوتي بوينت </h1>
                                        <p className="slide-cap-desc">تطبيق بيوتي بوينت هو تطبيق لحجز مواعيد لدى الصالونات النسائية
                                            وخبيرات التجميل المستقلات و عيادات التجميل والأسنان والجلدية والليزر .
                                            انضمي لعالم بيوتي بوينت وسجلي الآن معنا
                                            هل لديك صالون أو مركز تزيين نسائي او انتي مستقلة يشرفنا بأن تكوني جزء من عالمنا </p>
                                        <div className="down-img">
                                            <a
                                                href="https://apps.apple.com/ma/app/beauty-point-%D8%A8%D9%8A%D9%88%D8%AA%D9%8A-%D8%A8%D9%88%D9%8A%D9%86%D8%AA/id1588135043?l=ar">
                                                <img className="store"
                                                    src="./assets/img/appstore.png"
                                                    alt="appstore" />
                                            </a>
                                            <a href="https://play.google.com/store/apps/details?id=com.con_point.beauty">
                                                <img className="ml-10 store"
                                                    src="./assets/img/play-store.png"
                                                    alt="play-store" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="home-right">
                                <img className="img-fluid" data-tilt="" data-tilt-perspective="110" data-tilt-speed="400"
                                    data-tilt-max="1.2"
                                    src="./assets/img/splash and home.png"
                                    alt="slider-caption"
                                    style={ { willChange: 'transform', transform: 'perspective(110px) rotateX(0deg) rotateY(0deg)' , } } />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about" id="about">
                <div className="about-decor">
                    <div className="about-circle1">
                        <img src="./assets/img/team1.png" alt="team1" />
                    </div>
                    <div className="about-circle2">
                        <img src="./assets/img/main-banner1.png" alt="banner1" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="about-contain">
                                <div>
                                    <h2 className="title"> قصتنا </h2>
                                    <p className="caption-about"> باختصار عندنا موظفة اسمها حور - اسمها حلو صح ـ وحور شكلها تاخذ
                                        فراشها معها وتنام في صالونات التزيين من كثر ماتروح لها ، وقاعدة تخلص الشغل اونلاين
                                        واتصالات وايميلات وزحمة وقروشة وهي تنتظر دورها يجيها في الصالون، وينتهي الدوام وحور
                                        مابعد نورتنا ـ بس تراها ماتقصر بشغلها وتخلصه أول بأول ـ و أخيراً جاء يوم و اعلنتها حور
                                        بصوت عالي - خلاص انا طفشت كل ماروح صالون يروح وقتي انتظر دوري لازم أشوف حل للمشكلة هذي -
                                        وقلنا بسيطة ياحور غالية والطلب رخيص - كم حور عندنا ، المحلل موجود والمصممين موجودين
                                        والمبرمجين موجودين - آمري تدللي - والله واستلمتهم حور واحد واحد و حللتهم تحليل الين خلصت
                                        التطبيق و اشترطت هي اللي تسميه - أمرنا لله مانقدر نقول لها لا، مديرة كبيرة علينا - وسمت
                                        تطبيقها بيوتي بوكنق والحين حور تبغى البنات كلهم والصالونات يستفيدون من تطبيقها بيوتي
                                        بوكنق و ما يعانون مثل ماكانت تعاني -احنا اللي كنا نعاني عشان المكتب مظلم دايم بدونها -
                                        وقالت نزلوا التطبيق في المتاجر و سووا له اعلانات - سمعاً و طاعة أي أوامر ثانية ياست حور
                                        - والحين نزلنا تطبيق بيوتي بوكنق في المتاجر وتقدرون تحملونه وتحجزون عن طريقه، ولو فيه أي
                                        اقتراحات تحبون حور تضيفها او تعدلها في تطبيقها بيوتي بوكنق تقدرون تتواصلون معها هي
                                        وفريقها عن طريق تواصل معنا في التطبيق أو أي وسيلة من وسائل التواصل الموجودة في الموقع من
                                        أيقونة المشاركة فوق </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 d-medium-none">
                            <div className="about-right">
                                <div className="about-phone">
                                    <img className="img-fluid" src="./assets/img/splash.png"
                                        alt="aboutus" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="feature" id="feature">
                <div className="feature-decor">
                    <div className="feature-circle1">
                        <img src="./assets/img/main-banner1.png" alt="" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="feature-phone">
                            <img className="img-fluid" src="./assets/img/map.png" alt="" />
                        </div>
                        <div className="set-margin col-lg-8">
                            <div className="row">
                                <div className="col-sm-12 mrgn-md-top">
                                    <h2 className="title">ميزات <span> التطبيق </span></h2>
                                </div>
                                <div className="col-12 col-md-6">
                                    <ul className="feature-style">
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-user fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> الوصول و الإطلاع </h3>
                                            </div>
                                            <div>
                                                <p> اتاحة الوصول والإطلاع على جميع خدمات مزود الخدمة التفصيلية ، بالإضافة الى
                                                    العروض الخاصة به. </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-chart-line fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> الحجز اليومي </h3>
                                            </div>
                                            <div>
                                                <p> إمكانية القيام بالحجز خلال أي وقت في اليوم . </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-cogs fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> الدعم الفني </h3>
                                            </div>
                                            <div>
                                                <p> توافر الدعم الفني من خلال فريق خدمة العملاء ، ٢٤ ساعة طوال أيام الإسبوع.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-cogs fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> واجهة المستخدم </h3>
                                            </div>
                                            <div>
                                                <p> واجهة مستخدم مميزة وسهلة الإستخدام </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-cogs fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> العروض </h3>
                                            </div>
                                            <div>
                                                <p> الحصول على عروض وخصومات حصرية وخاصة بالتطبيق . </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 col-md-6 sm-m-top">
                                    <ul className="feature-style">
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-sync fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> نقاط مجانية </h3>
                                            </div>
                                            <div>
                                                <p> الحصول على عدد نقاط مجانية تضاف الى ملف العميل/ة على كل مبلغ نقدي يتم دفعه
                                                    لدى مزود الخدمة عند الحجز عن طريق التطبيق. </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-lock fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> استبدال النقاط </h3>
                                            </div>
                                            <div>
                                                <p> اتاحة امكانية استبدال النقاط بخدمات مباشرة لدى أحد مزودين الخدمة المشاركين
                                                    بالبرنامج . </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-headset fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> كوبونات الخصم </h3>
                                            </div>
                                            <div>
                                                <p>اتاحة استبدال النقاط على شكل كوبونات خصم أو رصيد مجاني في ملف العميل/ة . </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="feature-icon">
                                                <i className="fas fa-headset fa-lg" style={ { color: '#96248e' , } }></i>
                                            </div>
                                            <div className="feature-subtitle">
                                                <h3> التنسيق </h3>
                                            </div>
                                            <div>
                                                <p> امكانية التنسيق مابين العميل ومزود الخدمة عن طريق خدمة المحادثة الحية في
                                                    التطبيق . </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="screenshot padding-top-bottom" id="screenshot">
                <div className="screenshot-decor">
                    <div className="screenshot-circle1"><img
                            src="./assets/img/team1.png"
                            alt="feature-circle-two" /></div>
                    <div className="screenshot-circle2"><img
                            src="./assets/img/main-banner1.png" alt="feature-circle" />
                    </div>
                    <div className="screenshot-circle3"><img
                            src="./assets/img/main-banner1.png"
                            alt="feature-circle-three" /></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="screenshot-contain">
                                <img className="mobile-light-left"
                                    src="https://beautybooking.app/public/site/assets/images/light.png" alt="light" />
                                <img className="mob-mocup img-fluid"
                                    src="./assets/img/mob.png"
                                    alt="screenshot-mob" />
                                <img className="mobile-light-right"
                                    src="https://beautybooking.app/public/site/assets/images/light-right.png" alt="light-right" />
                                <div className="screenshot-carousel-rtl owl-carousel owl-theme owl-rtl owl-loaded owl-drag">
                                    <div className="owl-stage-outer">
                                        <div className="owl-stage"
                                            style={{ transition: 'all 0s ease 0s', width: '4104px', transform:' translate3d(684px, 0px, 0px)' }}>
                                            <div className="owl-item cloned" >
                                                <div className="screenshot-item">
                                                    <img src={image1} alt="screenshot-item" />
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" >
                                                <div className="screenshot-item">
                                                    <img src={image2} alt="screenshot-item" />
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" >
                                                <div className="screenshot-item">
                                                    <img src={image3} alt="screenshot-item" />
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" >
                                                <div className="screenshot-item">
                                                    <img src={image4} alt="screenshot-item" />
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" >
                                                <div className="screenshot-item">
                                                    <img src={image5} alt="screenshot-item" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="owl-nav disabled"><button type="button" role="presentation"
                                            className="owl-prev"><span aria-label="Previous">‹</span></button><button type="button"
                                            role="presentation" className="owl-next"><span aria-label="Next">›</span></button></div>
                                    <div className="owl-dots disabled"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="download" id="download">
                <div className="container">
                    <h2 className="title">حمل التطبيق</h2>
                    <p>يمكنك الان تحميل التطبيق من المتاجر الاتية</p>
                    <div className="down-img">
                        <a
                            href="https://apps.apple.com/ma/app/beauty-point-%D8%A8%D9%8A%D9%88%D8%AA%D9%8A-%D8%A8%D9%88%D9%8A%D9%86%D8%AA/id1588135043?l=ar">
                            <img className="store" src="./assets/img/appstore.png"
                                alt="appstore" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.con_point.beauty">
                            <img className="store" src="./assets/img/play-store.png"
                                alt="play-store" />
                        </a>
                    </div>
                    <div className="FooterLastImg">
                        <img src="./assets/img/splash.png" style={{width: '700px',}} alt="Bottom Bg" />
                    </div>
                </div>
            </section>
            <a className="tap-whats" href="https://api.whatsapp.com/send?phone=00966581001969&text=السلام عليكم">
                <div><i className="fab fa-whatsapp"></i></div>
            </a>
            <div className="copyright-section index-footer">
                <p>جميع الحقوق محفوظة لبيوتي بوينت 2021</p>
            </div>
        </div>
    )
}
export default Landing;