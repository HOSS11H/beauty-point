export const appendScript = ( sciptToBeAppended ) => {
    const script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = sciptToBeAppended;
    script.async = true;
    document.body.appendChild( script );
};