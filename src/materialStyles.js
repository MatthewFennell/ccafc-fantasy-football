export default theme => ({
    paper: {
        margin: theme.spacing(4),
        padding: '30px'
    },
    paperBigSideMargins: {
        padding: '30px',
        margin: theme.spacing(4),
        marginLeft: theme.spacing(16),
        marginRight: theme.spacing(16)
    },
    paperBigSideMarginsFadingCollapsable: {
        margin: theme.spacing(4),
        marginLeft: theme.spacing(16),
        marginRight: theme.spacing(16),
        position: 'relative'
    },
    paperMobile: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: '20px'
    },
    paperSmallMargin: {
        margin: theme.spacing(2),
        padding: '30px'
    },
    paperNoMargin: {
        padding: '30px'
    },
    paperNoPadding: {
        margin: theme.spacing(4)
    },
    fadingCollapsable: {
        position: 'relative',
        margin: theme.spacing(4)

    },
    fadingCollapsableMobile: {
        position: 'relative',
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    fadingCollapsableHover: {
        '&:hover': {
            backgroundColor: 'rgba(173,216,230,0.3)'
        }
    },
    thirtyWidth: {
        width: '30%'
    },
    maxWidth: {
        width: '100%'
    }
});
