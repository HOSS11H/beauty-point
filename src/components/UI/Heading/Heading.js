import styled from 'styled-components';

export const Heading = styled.div`
    margin-bottom: 48px;

    @media screen and (max-width: 899.98px) {
        text-align  : center;
        max-width   : 500px;
        margin-left : auto;
        margin-right: auto;
    }

    @media screen and (max-width: 599.98px) {
        text-align  : center;
        max-width   : 500px;
        margin-left : auto;
        margin-right: auto;
    }

    .heading-title {
        text-transform: capitalize;
        font-size     : 36px;
        line-height   : 1.5;
        margin-bottom : 0px;
        font-weight   : 500;
        color         : ${ ( { theme } ) => theme.vars.secondary};
        @media screen and (max-width: 899.98px) {
            font-size  : 30px;
            line-height: 1.4;
        }
    }
    &.heading-2 {
        margin-bottom: 60px;
        text-align: center;
        @media screen and (max-width: 899.98px) {
            display: none;
        }
        .heading-title {
            font-size    : 42px;
            line-height  : 1.5;
            @media screen and (max-width: 899.98px) {
                font-size  : 30px;
                line-height: 1.4;
            }
        }
    }
`