import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styled from 'styled-components';

const ModuleSocialWrapper = styled.div`
    a {
        margin-right : 13px;
        &:last-child {
            margin-right : 0px;
        }
        svg{
            font-size :16px;
            color        :${({ theme }) => theme.palette.common.white};
            transition   : 300ms ease-in-out;
            &:hover {
                transform: translateY(-5px);
                color    : ${({ theme }) => theme.vars.secondary};
            }
        }
    }
`

const ModuleSocial = props => {
    return (
        <ModuleSocialWrapper>
            <a className="share-facebook" href="https://www.facebook.com/Beautypointksa" >
                <FacebookIcon />
            </a>
            <a className="share-twitter" href='https://www.twitter.com/Beautypointksa' >
                <TwitterIcon />
            </a>
            <a className="share-instagram" href='https://www.instagram.com/Beautypointksa' >
                <InstagramIcon />
            </a>
            <a className="share-snapchat" href='https://www.snapchat.com/Beautypointksa' >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill='#fff' ><path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" fill="#fff" /></svg>
            </a>
            <a className="share-tiktok" href='https://www.tiktok.com/Beautypointksa' >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width={16}
                    height={16}
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                >
                    <desc>Created with Fabric.js 1.7.22</desc>
                    <defs></defs>
                    <g transform="translate(128 128) scale(0.72 0.72)" style={{}}>
                        <g
                            style={{
                                stroke: "none",
                                strokeWidth: 0,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "none",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                        >
                            <path
                                d="M 34.876 90 c -6.417 0 -12.469 -2.046 -17.499 -5.918 c -0.937 -0.721 -1.841 -1.511 -2.688 -2.347 c -3.86 -3.815 -6.518 -8.596 -7.687 -13.826 c -0.12 -0.539 0.219 -1.073 0.758 -1.193 c 0.541 -0.12 1.074 0.219 1.194 0.758 c 1.085 4.854 3.554 9.294 7.14 12.839 c 0.789 0.778 1.631 1.514 2.503 2.186 C 23.274 86.098 28.903 88 34.876 88 c 1.334 0 2.679 -0.099 3.997 -0.294 c 5.621 -0.833 10.733 -3.39 14.784 -7.394 c 3.592 -3.55 6.063 -7.989 7.147 -12.838 c 0.12 -0.539 0.657 -0.878 1.193 -0.758 c 0.539 0.12 0.879 0.654 0.758 1.193 c -1.167 5.225 -3.827 10.005 -7.692 13.824 c -4.355 4.306 -9.853 7.055 -15.897 7.95 C 37.751 89.894 36.308 90 34.876 90 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                            <path
                                d="M 34.918 75.767 c -0.26 0 -0.52 -0.007 -0.78 -0.021 c -2.251 -0.124 -4.466 -0.804 -6.408 -1.965 c -4.213 -2.52 -6.771 -6.932 -6.844 -11.802 c -0.056 -3.773 1.372 -7.334 4.022 -10.023 c 2.66 -2.7 6.215 -4.188 10.01 -4.188 c 1.047 0 2.085 0.116 3.101 0.345 V 35.714 c -1.046 -0.121 -2.101 -0.183 -3.144 -0.183 c -7.731 0 -14.819 3.17 -19.957 8.925 c -3.057 3.424 -5.156 7.635 -6.07 12.179 c -0.109 0.541 -0.639 0.895 -1.178 0.783 c -0.542 -0.109 -0.892 -0.637 -0.783 -1.178 c 0.985 -4.893 3.246 -9.428 6.539 -13.117 c 5.523 -6.187 13.14 -9.593 21.449 -9.593 c 1.425 0 2.868 0.106 4.29 0.317 c 0.49 0.073 0.854 0.494 0.854 0.989 v 14.589 c 0 0.321 -0.154 0.622 -0.414 0.811 c -0.261 0.188 -0.596 0.24 -0.899 0.139 c -1.223 -0.403 -2.497 -0.608 -3.787 -0.608 c -3.255 0 -6.304 1.275 -8.585 3.591 c -2.271 2.306 -3.496 5.356 -3.447 8.591 c 0.062 4.172 2.256 7.953 5.871 10.114 c 1.665 0.996 3.563 1.579 5.491 1.686 c 1.515 0.08 3.016 -0.116 4.458 -0.592 c 4.933 -1.63 8.247 -6.207 8.247 -11.39 l 0.018 -38.705 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 l -0.018 38.706 c 0 6.046 -3.866 11.386 -9.62 13.287 C 37.901 75.528 36.419 75.767 34.918 75.767 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                            <path
                                d="M 62.418 57.438 c -0.551 0 -0.999 -0.446 -1 -0.998 l -0.062 -26.673 c -0.001 -0.382 0.216 -0.73 0.558 -0.899 c 0.344 -0.168 0.752 -0.128 1.053 0.105 c 2.402 1.853 5.043 3.393 7.849 4.577 c 4.078 1.721 8.387 2.652 12.819 2.773 V 24.015 c -4.747 -0.19 -9.237 -1.792 -13.041 -4.66 c -4.568 -3.445 -7.697 -8.417 -8.808 -14 C 61.567 4.259 61.428 3.135 61.37 2 H 48.971 v 9.809 c 0 0.552 -0.447 1 -1 1 s -1 -0.448 -1 -1 V 1 c 0 -0.552 0.447 -1 1 -1 H 62.34 c 0.549 0 0.995 0.442 1 0.99 c 0.013 1.346 0.15 2.682 0.407 3.973 c 1.016 5.102 3.874 9.646 8.051 12.795 c 3.697 2.789 8.105 4.267 12.752 4.276 c 0.094 -0.008 0.186 -0.003 0.28 0.016 c 0.468 0.093 0.805 0.503 0.805 0.98 v 14.305 c 0 0.552 -0.447 1 -1 1 c -0.003 0 -0.008 0 -0.012 0 c -5.05 0 -9.957 -0.99 -14.585 -2.943 c -2.349 -0.991 -4.587 -2.218 -6.677 -3.658 l 0.057 24.702 c 0.001 0.552 -0.445 1.001 -0.998 1.002 C 62.42 57.438 62.419 57.438 62.418 57.438 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                            <path
                                d="M 62.275 64.104 c -0.553 0 -1 -0.447 -1 -1 v -2.144 c 0 -0.553 0.447 -1 1 -1 s 1 0.447 1 1 v 2.144 C 63.275 63.657 62.828 64.104 62.275 64.104 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                            <path
                                d="M 7.572 64.104 c -0.552 0 -1 -0.447 -1 -1 v -2.144 c 0 -0.553 0.448 -1 1 -1 s 1 0.447 1 1 v 2.144 C 8.572 63.657 8.124 64.104 7.572 64.104 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                            <path
                                d="M 47.971 19.278 c -0.553 0 -1 -0.448 -1 -1 v -2.144 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 v 2.144 C 48.971 18.83 48.523 19.278 47.971 19.278 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(255,255,255)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                            />
                        </g>
                    </g>
                </svg>
            </a>
        </ModuleSocialWrapper>
    )
}
export default ModuleSocial;