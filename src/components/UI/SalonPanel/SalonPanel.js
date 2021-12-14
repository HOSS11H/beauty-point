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
            @include text(var(--global--font-body), 17px, 1.5, 300, var(--global--color-heading), 30px);
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
        }
        .salon-location {
            @include text(var(--global--font-body), 16px, 21px, 300, var(--global--color-heading), 0px);
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