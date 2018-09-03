import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from '../assets/Tumblr.css';
import toggleStyles from '../assets/Toggle.css';
import { Button, FormGroup, FormControl, Grid, Row, Col, Image, DropdownButton, MenuItem, Carousel, Modal, Checkbox, ResponsiveEmbed, Clearfix } from 'react-bootstrap';
import Toggle from 'react-toggle';
import clientId from './clientId.json';
import PropTypes from 'prop-types';
import zip from 'jszip';
import FileSaver from 'file-saver';
import * as _ from 'lodash';
import tumblrAuth from '../../tumblrAuth.json'
import { Menu, Item, Sidebar, Segment, Icon, Header, Sticky, Rail, Grid as SemanticGrid } from 'semantic-ui-react';
// import Moment from 'react-moment';
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");
var moment = require('moment');


class TumblrCatchr extends Component {


    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.download = this.download.bind(this);
        this.downloadIndividually = this.downloadIndividually.bind(this);
        this.retrieveMoreMedia = this.retrieveMoreMedia.bind(this);
        this.retrieveAdditionalData = this.retrieveAdditionalData.bind(this);
        this.isNewSite = false;

        this.state = {
            photos: [],
            videos: [],
            media: [],
            // site: "",
            site: "",
            initialSite: "",
            num: 3,
            checkedMedia: [],
            downloadProgression: "0%",
            totalPosts: 0,
            offset: 0

        }
    }


    retrieveData() {
        this.retrieveImages(0);
        this.retrieveVideos(0);
        this.isNewSite = false;
    }

    retrieveAdditionalData() {
        this.setState({
            offset: this.state.offset + 50
        })
        this.retrieveImages(this.state.offset + 50)
        this.retrieveVideos(this.state.offset + 50)
    }

    sandtizeURL(site) {

    }
    //separting videos and images allow less stress for multiple calls with the api 3950 all posts vs 200+1000 media post


    retrieveImages(offset) {
        let me = this;
        let photoArray = [];
        let media = [];


        if (this.state.site === this.state.initialSite && !this.isNewSite) {

            photoArray = this.state.photos;
            // media = this.state.media;

        }

        let index = 0;
        //(https:\/\/)\S+\....
        let url = this.sandtizeURL(this.state.site);
        axios.get('https://api.tumblr.com/v2/blog/' + this.state.site + '.tumblr.com/posts/photo?limit=50&offset=' + offset, {
            headers: {
                Authorization: "OAuth oauth_consumer_key=" + '"' + tumblrAuth.Authorization + '"'
            }
        }).then(function (response) {
            console.log(response)
            response.data.response.posts.forEach((post) => {

                if (post.type == "text") {
                    let url = post.body.match(/(https:\/\/)\S+\.((gif)|(jpg)|(png)|(jpeg))/);
                    photoArray.push({ type: "photo", url: url[0], date: post.date, slug: post.slug, formattedDate: moment(post.date).format("MMMM YYYY") })
                } else {
                    post.photos.forEach((photo) => {
                        photoArray.push({ type: post.type, url: photo.original_size.url, slug: post.slug, date: post.date, formattedDate: moment(post.date).format("MMMM YYYY") })
                        index++
                    })
                }
                index++;
            })
            me.setState({
                photos: photoArray,
                // media: [...photoArray, ...me.state.media],
                initialSite: me.state.site,
                totalImagePosts: response.data.response.total_posts
            })
            console.log(me)

        })
    }


    retrieveVideos(offset) {
        let me = this;
        let videoArray = [];
        let media = [];


        if (this.state.site === this.state.initialSite) {
            videoArray = this.state.videos;
            // media = this.state.media;
        }

        let index = 0;

        let url = this.sandtizeURL(this.state.site);

        axios.get('https://api.tumblr.com/v2/blog/' + this.state.site + '.tumblr.com/posts/video?limit=50&offset=' + offset, {
            headers: {
                Authorization: "OAuth oauth_consumer_key=" + '"' + tumblrAuth.Authorization + '"'
            }
        }).then(function (response) {
            console.log(response)
            response.data.response.posts.forEach((post) => {
                if (post.type == "text") {
                    let url = post.body.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)((mp4))/)
                    videoArray.push({ type: "video", url: url[0], slug: post.slug, date: post.date, formattedDate: moment(post.date).format("MMMM YYYY") })
                } else {
                    if (post.video_type !== "vimeo") {
                        videoArray.push({ type: post.type, url: post.video_url, slug: post.slug, date: post.date, formattedDate: moment(post.date).format("MMMM YYYY") })

                    }
                }
                index++;
            })
            me.setState({
                videos: videoArray,
                initialSite: me.state.site,
                // media: [...videoArray, ...me.state.media],
                totalPosts: response.data.response.total_posts
            })
            console.log(me)

        })
    }

    // addMediaToState() {

    // }



    retrieveMoreMedia() {
        this.retrieveVideos(49)
    }



    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            photos: [],
            videos: [],
            media: []
        })
        this.isNewSite = true;
        this.retrieveData();

        // debugger
    }

    renderSumbitBox(inputBoxWidth) {

        return (
            <form onSubmit={this.handleSubmit}>
                {/* <label style={{ position: "relative" }}> */}
                <FormControl
                    type="text"
                    value={this.state.site}
                    placeholder="Website"
                    onChange={this.handleChange} />
                <button type="submit" value="Submit" className="submit-button">
                    submit

                    </button>
                {/* </label> */}
            </form>
        )
    }

    handleChange(event) {

        this.setState({
            site: event.target.value.replace(" ", "")
        });
    }

    handleCheckbox(event) {
        let target = event.target
        let checked = target.checked
debugger
        let checkedMedia = {
            url: target.dataset.url,
            index: target.dataset.index,
            checked: target.checked,
            slug: target.dataset.slug
        }
        this.checkedMedia(checkedMedia)
    }

    checkedMedia(checkedMedia) {
        let checkedMediaArray = [...this.state.checkedMedia];

        if (checkedMedia.checked) {
            checkedMediaArray.push(checkedMedia)
        } else {
            let checkedMediaIndexes = this.state.checkedMedia.map(media => {
                return media.index
            })

            checkedMediaArray = this.state.checkedMedia.filter((media) => {
                return media.index !== checkedMedia.index
            })

        }

        this.setState({
            checkedMedia: checkedMediaArray
        })
    }

    renderMediaByDate() {
        let dates = _.unionBy([...this.state.videos, ...this.state.photos], "formattedDate").map(date => {
            return date.formattedDate;
        });

        // let groupedMedia = _.groupBy(this.state.media, "formattedDate");

        return dates.map((date, index) => {
            return (
                <div className="rendered-media" key={index}>
                    <div className="title">
                        <h1>
                            {date}
                        </h1>
                    </div>
                    {this.renderMedia(date)}

                </div>
            )
        })
    }

    renderMedia(date) {

        let groupedMedia = _.groupBy([...this.state.videos, ...this.state.photos], "formattedDate");


        return groupedMedia[date].map((field, index) => {

            var day = moment(field.date).format("MMMM YYYY");
            if (field.type === "video") {
                return (
                    <Col xs={this.state.num} md={this.state.num} key={index}>
                        <ResponsiveEmbed a16by9>
                            <Checkbox
                                onChange={this.handleCheckbox}
                                data-url={field.url}
                                data-index={index}
                                data-slug={field.slug}>
                                <video controls>
                                    <source src={field.url} type="video/mp4" />
                                    Your browser does not support the video tag.</video>
                            </Checkbox>
                        </ResponsiveEmbed>
                    </Col>
                )
            } else if (field.type === "photo") {
                return (
                    <Col xs={this.state.num} md={this.state.num} key={index} >
                        <Checkbox
                            onChange={this.handleCheckbox}
                            data-url={field.url}
                            data-index={index}
                            data-slug={field.slug}>
                            <Image style={{ "width": "200", "maxHeight": "140px" }} src={field.url} responsive key={index} />
                        </Checkbox>
                    </Col>
                )
            }
        })
        // })

    }

    download() {
        var me = this;

        var zip = new JSZip();
        this.state.checkedMedia.map(link => {

            var filename = link.url.replace(/.*\//g, "");
            zip.file(filename, this.urlToPromise(link.url), { binary: true, createFolders: true });
        })
        // zip.file(url, this.urlToPromise(url), {binary:true});
        zip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
            me.setState({ downloadProgression: metadata.percent + " %" })

        })
            .then(function callback(blob) {

                FileSaver.saveAs(blob, me.state.site + ".zip");

            }, function (e) {
                // showError(e);
            });

        return false;


    }

    downloadIndividually() {
        this.state.checkedMedia.map(link => {
            let fileFormat = link.url.match(/(jpg)|(gif)|(png)|(jpeg)|(mp4)$/);
            // let videoFileFormat = link.url.match(/(mp4)$/);
            let imageOrVideo = "image/;"
            if (fileFormat[0] === "mp4") {
                imageOrVideo = "video/";
            }

            var xhr = new XMLHttpRequest();

            var url = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Internet2.jpg';

            xhr.responseType = 'arraybuffer';
            xhr.open('GET', link.url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == xhr.DONE) {

                    var file = new Blob([xhr.response], { type: imageOrVideo + fileFormat[0] });
                    FileSaver.saveAs(file, link.slug + '.' + fileFormat[0]);
                }
            };
            xhr.send();
        });
    }


    urlToPromise(url) {
        return new Promise(function (resolve, reject) {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    momentTest() {
        var day = moment("1995-12-25").format();
        return (<div>

            {day}

        </div>
        )
    }
    render() {
        return (
            <div>

                TumblrCatchr
                {this.renderSumbitBox()}
                {this.state.downloadProgression}
                <div className="utility">
                    <button type="submit" onClick={this.download} value="Download" className="submit-button">
                        Download Here
                    </button>
                    <button type="submit" onClick={this.downloadIndividually} value="Download" className="submit-button">
                        Download One by one
                    </button>
                    <button type="submit" onClick={this.retrieveAdditionalData} value="Download" className="submit-button">
                        Get more
                    </button>
                </div>

                {this.momentTest()}
                <FormGroup>
                    {this.renderMediaByDate()}
                </FormGroup>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    }
};

export default connect(mapStateToProps)(TumblrCatchr);
