import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const SalonPanelCard = styled.div`
    border-radius: 25px;
    margin: 0 auto;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 0px;
        max-width: 370px
    }
    cursor: pointer;
    &:hover {
        .salon-img  {
            img {
                transform: scale(1.1);
            }
        }
    }
    .salon-img  {
        height: 200px;
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        img {
            width: 100%;
            height: 100%;
            border-radius: 25px 25px 0 0;
            object-fit: cover;
            transition: all 0.3s ease;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .salon-content {
        background-color: #F7F7F7;
        background-color: ${({ theme }) => theme.palette.mode === "dark" ? "#000" : "#f7f7f7"};
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .salon-title {
            font-size: 22px;
            line-height:1.5;
            font-weight: 500;
            color         : ${ ( { theme } ) => theme.vars.secondary};
            margin-bottom:0;
            text-transform: capitalize;
            @media screen and (max-width: 899.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color         : ${ ( { theme } ) => theme.vars.secondary};
            }
        }
        .salon-desc {
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 30px;
            @media screen and (max-width: 899.98px) {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .salon-location {
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 899.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`
const SalonPanel = props => {

    const { salon, path } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${path}/${salon.id}`)
    }

    return (
        <SalonPanelCard onClick={handleClick} >
            <div className="salon-img">
                <img src={salon.logo_url} alt="salon" />
            </div>
            <div className="salon-content">
                <h3 className="salon-title">{salon.companyName}</h3>
                <p className="salon-desc">
                    {salon.address}
                </p>
            </div>
        </SalonPanelCard>
    )
}
export default SalonPanel;