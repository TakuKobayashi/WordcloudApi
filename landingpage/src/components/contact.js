import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PaperPlane, Loading } from "./icons";
import "../style/contact.less";

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: false
        };
        this.generateType = this.props.content.apiPathes[0].name;

        this.textAreaInput = this.textAreaInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    textAreaInput(event) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.submitDisabled) {
            this.setState({
                submitDisabled: true
            });

            let name = encodeURI(this.dataName.value),
                email = encodeURI(this.dataEmail.value),
                message = encodeURI(this.dataMessage.value),
                body = `name=${name}&email=${email}&message=${message}`;

            fetch("http://localhost/local/test.json", {
                method: "post",
                body: body
            })
                .then(function(res) {
                    return res.json();
                })
                .then(
                    result => {
                        this.setState({
                            submitDisabled: false
                        });
                        this.resMessage.style.opacity = 1;
                        if (result.response === "error") {
                            this.resMessage.innerHTML =
                                "There was an error in sending the message";
                            this.resMessage.classList.add("color-error");
                        } else {
                            this.resMessage.innerHTML =
                                "Message sent succesfully";
                            this.resMessage.classList.remove("color-error");
                        }
                        this.dataName.value = "";
                        this.dataEmail.value = "";
                        this.dataMessage.value = "";
                        let _this = this;
                        setTimeout(function() {
                            _this.resMessage.style.opacity = 0;
                        }, 5000);
                    },
                    error => {
                        this.resMessage.innerHTML = "Message sent succesfully";
                        this.resMessage.classList.remove("color-error");
                        this.setState({
                            submitDisabled: false
                        });
                        let _this = this;
                        setTimeout(function() {
                            _this.resMessage.style.opacity = 0;
                        }, 5000);
                    }
                );
        }
    }

    componentDidMount() {
        let color = window.getComputedStyle(this.btn, null).getPropertyValue("color");
        this.btn.querySelector("path").setAttribute("fill", color);

        let li = this.contactArea.querySelectorAll(".item");

        li.forEach(function(e, i) {
            let p = e.querySelector("path");
            if (p)
                p.setAttribute(
                    "fill",
                    window.getComputedStyle(e, null).getPropertyValue("color")
                );
        });
    }

    render() {
        const generateTypeOptions = this.props.content.apiPathes.map(pathContent => <option value={pathContent.name}>{pathContent.name}</option>)
        const fontOptions = this.props.content.fonts.map(font => <option value={font.filename}>{font.name}</option>)

        return (
            <section id="contact" className="container">
                <div
                    className="row"
                    ref={c => (this.contactArea = c)}
                >
                    <div className="col s12 m6">
                        <form>
                            <div className="field">
                                <label>
                                    <span className="label text-tertiary">
                                        Generate image from
                                    </span>
                                    <div className="input-border">
                                        <select
                                            className="field-box"
                                            name="generate_type"
                                            id="generate_type"
                                            onChange={(e) => { console.log(e) }}
                                            required
                                        >
                                            {generateTypeOptions}
                                        </select>
                                    </div>
                                </label>
                            </div>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Font
                                        </span>
                                        <div className="input-border">
                                            <select
                                                className="field-box"
                                                name="font"
                                                id="font"
                                                onChange={(e) => { console.log(e) }}
                                                required
                                            >
                                                {fontOptions}
                                            </select>
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Message
                                        </span>
                                        <div className="input-border">
                                            <textarea
                                                style={{ overflowY: "hidden" }}
                                                ref={c =>
                                                    (this.dataMessage = c)
                                                }
                                                className="field-box"
                                                onChange={this.textAreaInput}
                                                name="message"
                                                id="message"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label className="ib">
                                        <button
                                            className={
                                                "btn" +
                                                (this.state.submitDisabled
                                                    ? " disabled"
                                                    : "")
                                            }
                                            onClick={this.handleSubmit}
                                            id="submit"
                                            ref={c => (this.btn = c)}
                                        >
                                            SEND{" "}
                                            <span
                                                className="icon paper-plane"
                                                style={{
                                                    display: this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <PaperPlane />
                                            </span>
                                            <span
                                                className="icon loading"
                                                style={{
                                                    display: !this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <Loading />
                                            </span>
                                        </button>
                                    </label>
                                    <label>
                                        <p
                                            className="res-message"
                                            ref={c => (this.resMessage = c)}
                                        ></p>
                                    </label>
                                </div>
                            </form>
                        </div>
                </div>
            </section>
        );
    }
}

export default () => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        content {
                            apiPathes {
                                name,
                                path
                            }
                            fonts {
                                name,
                                filename
                            }
                        }
                    }
                }
            }
        `}
        render={data => <Contact content={data.site.siteMetadata.content} />}
    />
);
