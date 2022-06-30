import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Landing = props => {


    return (
        <Fragment>
            <div className="wrapper clearfix" id="wrapperParallax">
                {/*   
                Header
                =============================================  
                */}
                <header className="header header-transparent header-sticky">
                    <nav className="navbar navbar-sticky navbar-expand-lg" id="primary-menu">
                        <div className="container"> <a className="logo navbar-brand" href="index.html"><img className="logo logo-dark" src="assets/images/logo/logo-dark.png" alt="Appzy Logo" /><img className="logo logo-light" src="assets/images/logo/logo-light.png" alt="Appzy Logo" /></a>
                            <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarContent" aria-expanded="false"><span className="navbar-toggler-icon" /></button>
                            <div className="collapse navbar-collapse" id="navbarContent">
                                <ul className="navbar-nav ml-lg-auto">
                                    <li className="nav-item active"><a className="nav-link" href="#hero">الرئيسية</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#about">من نحن</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#features">المميزات</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#screenshots">الشاشات</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#video">الفيديوهات</a></li>
                                    <li className="nav-item"><a className="nav-link" href="https://beautypoint.sa/home">صفحة الجميلات</a></li>
                                    <li className="nav-item"><a className="nav-link" href="https://beautypoint.sa/auth">الصالونات </a></li>
                                    <li className="nav-item"><a className="nav-link" href="#pricing">الباقات</a></li>
                                    <li className="nav-item"><a className="nav-link" href="https://beautypoint.sa/auth?page=join-us">انضم الينا</a></li>
                                </ul>
                            </div>
                            {/* End .nav-collapse*/}
                        </div>
                        {/* End .container*/}
                    </nav>
                    {/* End .navbar*/}
                </header>
                {/*
                Hero Section
                ============================================= 
                */}
                <section className="hero hero-lead hero-lead-1" id="hero">
                    <div className="hero-cotainer">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-6 d-flex justify-content-center">
                                    <div className="hero-content wow fadeIn">
                                        <h1 className="hero-title">تطبيق بيوتي بوينت</h1>
                                        <p className="hero-desc">تطبيق بيوتي بوينت هو تطبيق لحجز مواعيد لدى الصالونات النسائية وخبيرات التجميل المستقلات و عيادات التجميل والأسنان والجلدية والليزر . انضمي لعالم بيوتي بوينت وسجلي الآن معنا هل لديك صالون أو مركز تزيين نسائي او انتي مستقلة يشرفنا بأن تكوني جزء من عالمنا</p>
                                        <div className="download-action"><a className="btn btn--white btn-bg ios-store-dark" href="..javascript" /><a className="btn btn--white btn-bg g-play-dark" href="..javascript" /></div>
                                        <div className="video-actions">
                                            <h3 className="video-heading">شاهد الفيديو</h3>
                                            <div className="video-wrapper">
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="player">
                                                            <div className="img-holder bg-overlay bg-overlay-dark">
                                                                <div className="bg-section"><img src="assets/images/video/1.png" alt="video image" /></div>
                                                            </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=qHy1uhxPnxU">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                                    <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                                                </svg></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="player">
                                                            <div className="img-holder bg-overlay bg-overlay-dark">
                                                                <div className="bg-section"><img src="assets/images/video/2.png" alt="video" /></div>
                                                            </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=BqcKUZLEGuE">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                                    <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                                                </svg></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="hero-img wow fadeIn"><img src="assets/images/hero/hero.png" alt="screenshot" /></div>
                                </div>
                            </div>
                            {/* End .row*/}
                        </div>
                        {/* End .container*/}<div className="shape-divider-bottom">
                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
                            </svg>
                        </div>
                    </div>
                    {/* End .hero-container*/}
                </section>
                {/*   
                About Section
                ============================================= 
                */}
                <section className="about" id="about">
                    <div className="container">
                        <div className="row align-items-center text-center-xs">
                            <div className="col-12 col-md-6 col-lg-5 offset-lg-1">
                                <div className="heading heading-1">
                                    <p className="heading-title">من نحن</p>
                                    <p className="heading-desc">بدأت بيوتي بوينت في عام 2020 في المملكة العربية السعودية، لابتكار تجربة مختلفة. بيوتي بوينت موقع وتطبيق انطلق بموقع خاص ومميز، بالتزامن مع التطور العظيم الذي حدث في المملكة العربية السعودية، وقد ضم مجموعات مختارة بعناية من الصالونات الفاخرة في جميع أنحاء السعودية بهدف تغطية جميع متطلبات المرأة السعودية العصرية، وليس هذا فقط، فقد رغبت بيوتي بوينت في إسعاد المرأة السعودية بشكل كبير وذلك من خلال توفير تطبيق يجمع تلك الصالونات تحت مظله واحده يضم كل ما تحتاج إليه من خدمات تجميل وعنايه وطبي ، ومنتجات من مستحضرات تجميل ومنتجات عناية بالبشرة إضافة إلى العطور والمواد الغذائية الصحية، عالية الجودة. تعمل بيوتي بوينت على توفير الراحة والرفاهية وذلك من خلال فريق عمل يبحث عن كل ما هو جديد ومبتكر في عالم الجمال، ويعمل على إرشادك إلى ما يناسبك لتتمتعي بجمال وأناقة لا مثيل لها، وقد تم بناء هذا الكيان بناءً على مجموعة من القيم الهامة . التعاون بين فريق العمل للحصول على أفضل نتيجة، البساطة التي تمنحك جمال لا يقاوم، وقد تم وضع هذه الأسس لتتناسب مع أهداف السعودية الجديدة، وتمنح المرأة العصرية كل ما تبحث عنه. الجمال والاناقة هنا في بيوتي بوينت إيمانا منا بفكرة تمكين المرأة، قررنا مساندة الطموحات الحالمات في إثبات خطواتهن بكل ثقة وثبات على أرض الواقع، وذلك من خلال تخصيص مكان خاص ل المستقلات . مفهومنا يدور حول الابتكار والتطوير والمستمر لما هو جديد دائما . أقوى الصالونات ومراكز التجميل : بيوتي قررت أن تقدم مجتمع شامل بقيم جديدة، وبالتالي لابد أن تنقل لكِ كل ما هو جديد في عالم التجميل، حيث تقدم تشكيلة كبيرة من الصونات والمراكز التجميل ومنتجات العنايه والتجميل .. لتبقي دائما على اطلاع باحدث العروض والخدمات .</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6"><img className="img-fluid mb-5 wow fadeInUp" src="assets/images/screenshots/about.png" alt="App screenshot" /></div>
                        </div>
                        {/* End .row*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/*   
                Featured Section
                ============================================= 
                */}
                <section className="features text-center bg-gray pt-50" id="features">
                    <div className="container">
                        <div className="heading heading-2 text-center">
                            <h2 className="heading-title">مميزات بيوتي بوينت</h2>
                        </div>
                        {/* End .heading  */}
                        <div className="row">
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card">
                                    <div className="feature-icon"><img src="assets/images/features/medical-mobile.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>تطبيق عميل</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card">
                                    <div className="feature-icon"><img src="assets/images/features/mobile-app.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>تطبيق مقدم الخدمة</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card">
                                    <div className="feature-icon"><img src="assets/images/features/cloud.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>نظام نقاط البيع السّحابي</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/disconnected.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>يمكنه العمل اوفلاين</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/verified.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>لوحة المراقبة</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/user.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>مدير حساب متجاوب</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/discount.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>العروض</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/services.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>الخدمات</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/products.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>المنتجات</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/link.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>ربط تقويم قوقل</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/report.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>االتقارير</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/package-box.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>ادارة المخزون</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/support.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>دعم فنّي على مدار السّاعة</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/employees.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>وحدة الزّبائن</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/cashier-machine.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>الويب كاشير</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/customer.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3> ادارة الموظفين</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/website-content.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>صفحة خاصه على الموقع </h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="feature-card active">
                                    <div className="feature-icon"><img src="assets/images/features/coupons.png" alt="Icon" /></div>
                                    <div className="feature-content">
                                        <h3>الكوبونات</h3>
                                    </div>
                                </div>
                                {/* End .feature-card */}
                            </div>
                        </div>
                        {/* End .row*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/* 
                Screenshots Section
                =============================================  
                */}
                <section className="screenshots screenshots-1" id="screenshots">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="screenshot-warp">
                                    <div className="owl-carousel carousel-navs" data-slide={5} data-slide-rs={3} data-autoplay="true" data-nav="true" data-dots="false" data-center="true" data-space={-20} data-loop="true"><img src="assets/images/screenshots/1.jpg" alt="screenshot" /><img src="assets/images/screenshots/2.jpg" alt="screenshot" /><img src="assets/images/screenshots/3.jpg" alt="screenshot" /><img src="assets/images/screenshots/4.jpg" alt="screenshot" /><img src="assets/images/screenshots/5.jpg" alt="screenshot" /><img src="assets/images/screenshots/8.jpg" alt="screenshot" /><img src="assets/images/screenshots/9.jpg" alt="screenshot" /></div>
                                </div>
                            </div>
                        </div>
                        {/* End .row*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/* 
                Video Section
                =============================================  
                */}
                <section className="video bg-gray" id="video">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-6">
                                <div className="heading heading-2">
                                    <h2 className="heading-title">شاهد الفيديو</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="video-card">
                                    <div className="player">
                                        <div className="img-holder bg-overlay bg-overlay-dark">
                                            <div className="bg-section"><img src="assets/images/video/1.png" alt="video" /></div>
                                        </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=19U2cNW0RsY">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                            </svg></a>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">الاعدادت الاساسيه</h3>
                                        <p className="video-desc">في هذا الفيديو يتم شرح كيفيه عمل الاعدادت الاساسية لنظام بيوتي بوينت</p>
                                    </div>
                                </div>
                                {/* End .video-card*/}
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="video-card">
                                    <div className="player">
                                        <div className="img-holder bg-overlay bg-overlay-dark">
                                            <div className="bg-section"><img src="assets/images/video/1.png" alt="video" /></div>
                                        </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=diU3700Q7mg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                            </svg></a>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">إضافة خدمة جديدة</h3>
                                        <p className="video-desc">كيفية "اضافه خدمة" في نظام بيوتي بوينت لادارة الصالونات النسائية في السعودية</p>
                                    </div>
                                </div>
                                {/* End .video-card*/}
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="video-card">
                                    <div className="player">
                                        <div className="img-holder bg-overlay bg-overlay-dark">
                                            <div className="bg-section"><img src="assets/images/video/1.png" alt="video" /></div>
                                        </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=jPvAW-maFHY">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                            </svg></a>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">إضافة منتج جديد</h3>
                                        <p className="video-desc">في هذا الفيديو سوف يتم شرح كيفية "اضافه منتج" في نظام بيوتي بونيت</p>
                                    </div>
                                </div>
                                {/* End .video-card*/}
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="video-card">
                                    <div className="player">
                                        <div className="img-holder bg-overlay bg-overlay-dark">
                                            <div className="bg-section"><img src="assets/images/video/1.png" alt="video" /></div>
                                        </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=Fzb83_6uqdE">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                            </svg></a>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">إضافة موظفة جديدة</h3>
                                        <p className="video-desc">في هذا الفيديو سوف يتم شرح كيفية " اضافه موظفه جديدة " لنظام بيوتي بوينت</p>
                                    </div>
                                </div>
                                {/* End .video-card*/}
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="video-card">
                                    <div className="player">
                                        <div className="img-holder bg-overlay bg-overlay-dark">
                                            <div className="bg-section"><img src="assets/images/video/1.png" alt="video" /></div>
                                        </div><a className="btn-video popup-video" href="https://www.youtube.com/watch?v=Gif6KrAyqP0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={29} viewBox="0 0 22 29">
                                                <path id="Polygon_4" data-name="Polygon 3" d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" transform="translate(24) rotate(90)" />
                                            </svg></a>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">نقطة البيع الحجز الداخلي</h3>
                                        <p className="video-desc">في هذا الفيديو سوف يتم شرح بالتفصيل"  نقطة البيع الحجز الداخلي </p>
                                    </div>
                                </div>
                                {/* End .video-card*/}
                            </div>
                        </div>
                        {/* End .row*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/*   
                About Section
                ============================================= 
                */}
                <section className="about about-2" id="about">
                    <div className="about-img"><img className="img-fluid" src="assets/images/screenshots/about-2.png" alt="App screenshot" /></div>
                    <div className="container">
                        <div className="row align-items-center text-center-xs">
                            <div className="col-12 col-md-6 col-lg-6 offset-lg-1">
                                <div className="about-img-plcaeholder" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-5">
                                <div className="heading heading-1">
                                    <p className="heading-title">من خلال بيوتي بوينت</p>
                                    <p className="heading-desc">
                                        يمكنك متابعه وادارة  مواعيدك الخاصه والتي تاتي من خلال التطبيق وترتيبها بجميع حالتها
                                        و اضافه
                                        العروض
                                        الخدمات
                                        العملاء
                                        كما نقدم لكي نقطه بيع متميزه
                                        ومتوافقه مع الفاتوره الاكترونيه
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* End .row*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/* 
                Pricing Table Section
                =============================================  
                */}
                <section className="pricing" id="pricing">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pricing-switcher">
                                    <input id="monthly" type="checkbox" />
                                    <input id="yearly" type="checkbox" />
                                    <label className="type active" htmlFor="monthly">شهريا</label>
                                    <div className="indicator"><span className="ball monthly" /></div>
                                    <label className="type" htmlFor="yearly">سنويا</label>
                                </div>
                            </div>
                        </div>
                        {/* End .row */}
                        <div className="pricing-container">
                            <div className="pricing-heads">
                                <ul className="pricing-list">
                                    <li> تطبيق عميل</li>
                                    <li> تطبيق مقدم الخدمة</li>
                                    <li> عدد لا محدود من الخدمات</li>
                                    <li> عدد لا محدود من المنتجات</li>
                                    <li> عدد لا محدود من العروض</li>
                                    <li> لوحة المراقبة</li>
                                    <li> مدير حساب متجاوب</li>
                                    <li> ربط تقويم قوقل</li>
                                    <li> نظام نقاط البيع السّحابي</li>
                                    <li> يمكنه العمل  اوف لاين</li>
                                    <li> دعم فنّي على مدار السّاعة</li>
                                    <li> وحدة الزّبائن</li>
                                    <li> التّقارير</li>
                                    <li> إدارة المخزون</li>
                                    <li> عدد لا محدود من الموظفين</li>
                                    <li> ادارة الموظفين</li>
                                    <li> امكانيه التحكم ب الادوار للموظفين</li>
                                    <li> الويب كاشير</li>
                                    <li> صفحة خاصه على الموقع </li>
                                    <li> امكانيه اضافة الادوار للموظفين</li>
                                    <li> الكوبونات</li>
                                    <li> مميزات اخرى</li>
                                </ul>
                                {/* End .pricing-list*/}
                            </div>
                            {/* End .pricing-heads*/}
                            <div className="pricing-table">
                                {/* Start Pricing Card #1 */}
                                <div className="pricing-card monthly visible">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price text"> تجربة مجانية</p>
                                        </div>
                                        <h6 className="pricing-name">باقة بيسيك</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--primary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card*/}
                                {/* Start Pricing Card #1*/}
                                <div className="pricing-card yearly hidden">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price text"> تجربة مجانية</p>
                                        </div>
                                        <h6 className="pricing-name">باقة بيسيك</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--primary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card*/}
                            </div>
                            {/* End .pricing-table*/}
                            <div className="pricing-table">
                                {/* Start Pricing Card #2*/}
                                <div className="pricing-card monthly visible active">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price"> 99.0</p>
                                            <p className="per">/ شهريا</p>
                                        </div>
                                        <h6 className="pricing-name">باقة بلس</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--secondary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card */}
                                {/* Start Pricing Card #2*/}
                                <div className="pricing-card yearly hidden active">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price"> 99.0</p>
                                            <p className="per">/ شهريا</p>
                                        </div>
                                        <h6 className="pricing-name">باقة بلس</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--secondary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card */}
                            </div>
                            {/* End .pricing-table*/}
                            <div className="pricing-table">
                                {/* Start Pricing Card #3*/}
                                <div className="pricing-card monthly visible">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price"> 199.0</p>
                                            <p className="per">/ شهريا</p>
                                        </div>
                                        <h6 className="pricing-name">باقة برو</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--primary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card */}
                                {/* Start Pricing Card #3*/}
                                <div className="pricing-card yearly hidden">
                                    {/*  Pricing heading   */}
                                    <div className="pricing-head">
                                        <div className="pricing-type">
                                            <p className="price"> 199.0</p>
                                            <p className="per">/ شهريا</p>
                                        </div>
                                        <h6 className="pricing-name">باقة برو</h6>
                                    </div>
                                    {/*  Pricing body*/}
                                    <div className="pricing-body">
                                        <ul className="pricing-list list-unstyled">
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li className="active"><i className="fas fa-check" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                            <li><i className="fas fa-times" /></li>
                                        </ul>
                                        {/* End .pricing-list*/}<a className="btn btn--primary btn--bordered" href="https://beautypoint.sa/auth?page=join-us">اشترك الأن</a>
                                    </div>
                                </div>
                                {/* End .pricing-card */}
                            </div>
                            {/* End .pricing-table*/}
                        </div>
                        {/* End .pricing-container*/}
                    </div>
                    {/* End .container*/}
                </section>
                {/* 
                Download Section
                =============================================  
                */}
                <section className="download" id="download">
                    <div className="download-overlay">
                        <div className="bg-section"> <img src="assets/images/background/bg-download.png" alt="Background" /></div>
                    </div>
                    <div className="container">
                        <div className="heading heading-light text-center wow fadeInUp mb-4">
                            <h2 className="heading-title">حمل التطبيق</h2>
                            <p className="heading-desc">يمكنك الان تحميل تطبيق الصالون من المتاجر الاتية</p>
                        </div>
                        <div className="download-action"><a className="btn btn--white btn-bg ios-store-dark" href="..javascript" /><a className="btn btn--white btn-bg g-play-dark" href="https://play.google.com/store/apps/details?id=com.conpoint.beautypointpro" /></div>
                        <div className="heading heading-light text-center wow fadeInUp mb-4 mt-5">
                            <p className="heading-desc">يمكنك الان تحميل تطبيق العميل من المتاجر الاتية</p>
                        </div>
                        <div className="download-action"><a className="btn btn--white btn--borderd btn-bg ios-store-dark" href="https://apps.apple.com/us/app/beauty-point-بيوتي-بوينت/id1588135043" /><a className="btn btn--white btn--borderd btn-bg g-play-dark" href="https://play.google.com/store/apps/details?id=com.conpoint.beautypointuser" /></div>
                    </div>
                    {/* End .container*/}
                </section>
                {/* 
                Footer
                ============================================= 
                */}
                <footer className="footer" id="footer">
                    <div className="bg-section"> <img src="assets/images/background/bg-footer.png" alt="background" /></div>
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="footer-widget widget-about">
                                        <div className="logo"> <img src="assets/images/logo/logo-footer.png" alt="logo" /></div>
                                        <div className="vat-section"><a href="https://maroof.sa/215840"><img src="assets/images/logo/indentifier_logo.png" alt="logo" /></a>
                                            <div> <img src="assets/images/logo/vat_logo.png" alt="logo" /></div>
                                        </div>
                                        {/* End .vat-section*/}
                                        <div className="footer-social"><span>تابعنا</span>
                                            <ul className="list-unstyled">
                                                <li> <a href="https://www.facebook.com/Beautypointksa"><i className="fab fa-facebook-f" /></a></li>
                                                <li> <a href="https://www.twitter.com/Beautypointksa"><i className="fab fa-twitter" /></a></li>
                                                <li> <a href="https://www.youtube.com/channel/UCVCXCdlVKXkDVmTh768ryXw"><i className="fab fa-youtube" /></a></li>
                                                <li> <a href="https://www.instagram.com/Beautypointksa"><i className="fab fa-instagram" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="footer-widget widget-newsletter">
                                        <h4 className="widget-title">أشترك </h4>
                                        <p>اشترك بالبريد الإلكتروني وسيتم إرسال أحدث الأخبار إليك</p>
                                        <div className="form-mailchimp">
                                            <form className="mb-0 form-action mailchimp">
                                                <div className="input-group">
                                                    <div className="input-icon">
                                                        <input className="form-control" type="email" placeholder="Enter Your E-mail" required="required" />
                                                    </div>
                                                    <button className="btn btn--primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.504" height="26.305" viewBox="0 0 15.504 26.305">
                                                            <path id="Icon" d="M581.84,3436.451l2.365-2.351,13.139,13.152L584.191,3460.4l-2.352-2.351,10.8-10.8Z" transform="translate(-581.84 -3434.1)" fill="#fff" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/*  End .input-group*/}
                                            </form>
                                            <div className="subscribe-alert" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4">
                                    <div className="footer-widget widget-links">
                                        <h4 className="widget-title">روابط قد تفيدك</h4>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul className="list-unstyled">
                                                    <li> <a href="#hero">الرئيسية</a></li>
                                                    <li> <a href="https://beautypoint.sa/home">صفحة الجميلات</a></li>
                                                    <li> <a href="#about">من نحن</a></li>
                                                    <li> <a href="#features">المميزات</a></li>
                                                    <li> <a href="#screenshots">الشاشات</a></li>
                                                    <li> <a href="https://beautypoint.sa/home/faqs">الأسئلة الشائعة</a></li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul className="list-unstyled">
                                                    <li> <a href="#video">الفيديوهات</a></li>
                                                    <li> <a href="&quot;https://beautypoint.sa/home">صفحة الجميلات</a></li>
                                                    <li> <a href="https://beautypoint.sa/auth">الصالونات</a></li>
                                                    <li> <a href="#pricing">الباقات</a></li>
                                                    <li> <a href="https://beautypoint.sa/auth?page=join-us">انضم الينا</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <hr />
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="footer-copyright"><span>2022 © <a href="https://con-point.com/">Con Point</a>. All rights reserved</span></div>
                                    <div className="footer-payments">
                                        <ul className="list-unstyled">
                                            <li> <a href="..javascript"> <img src="assets/images/logo/visa.svg" alt="logo" /></a></li>
                                            <li> <a href="..javascript"> <img src="assets/images/logo/master-card.svg" alt="logo" /></a></li>
                                            <li> <a href="..javascript"> <img src="assets/images/logo/mada.svg" alt="logo" /></a></li>
                                            <li> <a href="..javascript"> <img src="assets/images/logo/apple-pay.svg" alt="logo" /></a></li>
                                        </ul>
                                    </div>
                                    {/* End .footer-payments */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End .container  */}
                </footer>
            </div>
            <Helmet>
                <script src="assets/js/vendor/jquery-3.4.1.min.js"></script>
                <script src="assets/js/vendor.min.js"></script>
                <script src="assets/js/functions.js"></script>
            </Helmet>
        </Fragment>
    )
}
export default Landing;