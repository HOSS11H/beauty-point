import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DealPanelCard = styled.div`
    border-radius: 25px;
    padding: 0 9px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 0px;
        max-width: 370px
    }
    cursor: pointer;
    &:hover {
        .deal-img  {
            img {
                transform: scale(1.1);
            }
        }
    }
    .deal-img  {
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        img {
            width: 100%;
            border-radius: 25px 25px 0 0;
            height: 250px;
            object-fit: cover;
            transition: 0.3s ease;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .deal-content {
        background-color: ${({ theme }) => theme.palette.mode === "dark" ? "#000" : "#f7f7f7"};
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .deal-title {
            font-size: 22px;
            line-height:1.5;
            font-weight: 500;
            color         : #96248e;
            margin-bottom:0;
            text-transform: capitalize;
            @media screen and (max-width: 899.98px) {
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
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 10px;
            @media screen and (max-width: 899.98px) {
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
            @media screen and (max-width: 899.98px) {
                margin-right: 5px;
            }
            .discount-percent {
                display: flex;
                align-items: flex-end;
                font-size: 18px;
                line-height: 21px;
                font-weight: 300;
                color         : #96248e;
                @media screen and (max-width: 899.98px) {
                    font-size: 14px;
                    line-height: 1.5;
                }
                &.percentage {
                    align-items: center;
                }
                .discount-percent-sign {
                    font-size: 12px;
                    line-height: 14px;
                    font-weight: 500;
                    color         : #96248e;
                    text-transform: uppercase;
                    transform: translate(4px, -2px);
                    &.percentage {
                        font-size: 18px;
                        line-height: 21px;
                        transform: translate(0,0);
                        @media screen and (max-width: 899.98px) {
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
        .deal-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
        }
        .deal-status {
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`
const DealPanel = props => {

    const { t } = useTranslation()

    const { deal } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/deals/${deal.id}`);
    }


    return (
        <DealPanelCard onClick={handleClick} >
            <div className="deal-img">
                <img src={deal.image} alt="spotlight" />
            </div>
            <div className="deal-content">
                <h3 className="deal-title">{deal.title}</h3>
                <p className="deal-desc">
                    {deal.applied_between_time}
                </p>
                <div className="deal-body">
                    <div className="deal-discount">
                        <h5 className={`discount-percent ${deal.discount_type === 'percentage' && 'percentage'} `}  >
                            <span>{deal.discount_value}</span>
                            <span className={`discount-percent-sign ${deal.discount_type === 'percentage' && 'percentage'} `}>{deal.discount_type === 'percentage' ? '%' : 'SAR'}</span>
                        </h5>
                        <h6 className="discount-text" >off</h6>
                    </div>
                    <p className="deal-status">{t(deal.status)}</p>
                </div>
            </div>
        </DealPanelCard>
    )
}
export default DealPanel;