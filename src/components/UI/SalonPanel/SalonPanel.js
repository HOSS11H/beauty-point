import styled from "styled-components"

export const SalonPanel = styled.div`
    background-color: #fff;
    border-radius: 25px;
    margin-bottom: 30px;
    padding: 0 9px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 30px;
        max-width: 370px
    }
    .salon-img  {
        img {
            width: 100%;
            border-radius: 25px 25px 0 0;
            height: 250px;
            object-fit: cover;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .salon-content {
        background-color: #F7F7F7;
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .salon-title {
            font-size: 22px;
            line-height:1.5;
            font-weight: 500;
            color         : #96248e;
            margin-bottom:0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color         : #96248e;
            }
        }
        .salon-desc {
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            margin-bottom: 30px;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
        }
        .salon-location {
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`
export const DealPanel = styled.div`
    background-color: #fff;
    border-radius: 25px;
    margin-bottom: 30px;
    padding: 0 9px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 30px;
        max-width: 370px
    }
    .deal-img  {
        img {
            width: 100%;
            border-radius: 25px 25px 0 0;
            height: 250px;
            object-fit: cover;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .deal-content {
        background-color: #F7F7F7;
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .deal-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            flex-direction: ${ ( { theme }) => theme.direction === 'rtl' ? 'row-reverse' : 'row'  } ;
            .deal-title {
                font-size: 22px;
                line-height:1.5;
                font-weight: 500;
                color         : #96248e;
                margin-bottom:0;
                text-transform: capitalize;
                @media screen and (max-width: 599.98px) {
                    font-size: 16px;
                    line-height: 1.5;
                }
                a {
                    color         : #96248e;
                }
            }
            .deal-desc {
                font-size:17px;
                line-height:1.5;
                font-weight: 300;
                color         : ${props => props.theme.vars.black};
                margin-bottom: 0px;
                @media screen and (max-width: 599.98px) {
                    font-size: 14px;
                    line-height: 1.5;
                }
            }
            .deal-discount {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                margin-left: 10px;
                @media screen and (max-width: 599.98px) {
                    margin-left: 5px;
                }
                .discount-percent {
                    display: flex;
                    align-items: flex-end;
                    font-size: 18px;
                    line-height: 21px;
                    font-weight: 300;
                    color         : #96248e;
                    @media screen and (max-width: 599.98px) {
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    &.percentage {
                        align-items: center;
                    }
                    .discount-percent-sign {
                        font-size: 10px;
                        line-height: 14px;
                        font-weight: 500;
                        color         : #96248e;
                        text-transform: uppercase;
                        transform: translate(1px, -4px);
                        &.percentage {
                            font-size: 18px;
                            line-height: 21px;
                            transform: translate(0,0);
                            @media screen and (max-width: 599.98px) {
                                font-size: 14px;
                                line-height: 1.5;
                            }
                        }
                    }
                }
                .discount-text {
                    font-size: 18px;
                    line-height: 21px;
                    font-weight: 300;
                    color         : #96248e;
                    text-transform: uppercase;
                    @media screen and (max-width: 599.98px) {
                        font-size: 14px;
                        line-height: 1.5;
                    }
                }
            }
        }
        .deal-location {
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`