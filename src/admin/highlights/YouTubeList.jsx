import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import moment from 'moment';
import defaultStyles from './YouTubeList.module.scss';
import CustomYouTube from '../../common/youtube/YouTube';

const defaultOpts = {
    height: '390',
    // width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

// eslint-disable-next-line no-underscore-dangle
const generateTime = date => moment(new Date(date._seconds * 1000)).startOf('hour').fromNow();

const YouTubeList = props => {
    const [openVids, setOpenVids] = useState({});
    const onReady = e => e.target.pauseVideo();

    const toggleVideo = useCallback(id => {
        setOpenVids(fp.set(id, !fp.get(id)(openVids))(openVids));
    }, [openVids, setOpenVids]);

    return (
        <div className={props.styles.videoListWrapper}>
            {props.videos.map(x => (
                <div className={props.styles.videoWrapper} key={x.id}>
                    {fp.get(x.id)(openVids) ? (
                        <>
                            <div className={props.styles.expandLess}>
                                <ExpandLessIcon onClick={() => toggleVideo(x.id)} />
                            </div>
                            <div className={props.styles.videoTitle}>
                                {`Title: ${x.title}`}
                            </div>
                            <div className={props.styles.email}>
                                {`Email: ${x.email}`}
                            </div>
                            <div className={props.styles.dateCreated}>
                                {`Created: ${generateTime(x.dateCreated)}`}
                            </div>
                            <div className={props.styles.video}>
                                <CustomYouTube
                                    videoId={x.videoId}
                                    opts={props.opts}
                                    onReady={onReady}
                                />
                            </div>
                        </>
                    ) : (
                        <div className={props.styles.collapsedVideoWrapper}>
                            <div className={props.styles.expandIcon}>
                                <ExpandMoreIcon onClick={() => toggleVideo(x.id)} />
                            </div>
                            <div
                                onClick={() => toggleVideo(x.id)}
                                role="button"
                                tabIndex={0}
                                className={props.styles.collapsedTitle}
                            >
                                <div>{`Title: ${x.title}`}</div>
                                <div>{`Author: ${x.email}`}</div>
                                <div>{`Created ${generateTime(x.dateCreated)}`}</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

YouTubeList.defaultProps = {
    opts: defaultOpts,
    styles: defaultStyles,
    videos: []
};

YouTubeList.propTypes = {
    opts: PropTypes.shape({

    }),
    styles: PropTypes.objectOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.shape({}))
};

export default YouTubeList;
