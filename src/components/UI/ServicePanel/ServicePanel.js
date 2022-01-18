import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatCurrency } from '../../../shared/utility';

const ServicePanelCard = styled.div`
    border-radius: 25px;
    padding: 0 9px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 0px;
        max-width: 370px
    }
    cursor: pointer;
    &:hover {
        .service-img  {
            img {
                transform: scale(1.1);
            }
        }
    }
    .service-img  {
        height: 200px;
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        img {
            width: 100%;
            height: 100%;
            border-radius: 25px 25px 0 0;
            object-fit: cover;
            transition: 0.3s ease;
            @media screen and (max-width: 899.98px) {
                height: 200px;
            }
        }
    }
    .service-content {
        background-color: #F7F7F7;
        background-color: ${({ theme }) => theme.palette.mode === "dark" ? "#000" : "#f7f7f7"};
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .service-title {
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
        .service-salon {
            font-size: 18px;
            line-height:1.5;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom:0;
            text-transform: capitalize;
            margin-bottom: 15px;
            @media screen and (max-width: 899.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color: ${({ theme }) => theme.palette.text.primary};
            }
        }
        .service-price {
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
    }
`

const ServicePanel = props => {

    const { service } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/services/${service.id}`)
    }

    return (
        <ServicePanelCard onClick={handleClick} >
            <div className="service-img">
                <img src={service.image} alt="service" />
            </div>
            <div className="service-content">
                <h3 className="service-title">{service.name}</h3>
                <h3 className="service-salon">{service.company?.companyName}</h3>
                <p className="service-price">
                    {formatCurrency(service.price)}
                </p>
            </div>
        </ServicePanelCard>
    )
}
export default ServicePanel;