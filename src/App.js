import React from 'react';
import './App.scss';
import { marked } from "marked";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewerMaximize = this.handlePreviewerMaximize.bind(this);
  }

  handleChange = (event) => {
    this.setState({ markdown: event.target.value });
  };
  handleEditorMaximize = () => {
    this.setState({ editorMaximized: !this.state.editorMaximized });
  }
  handlePreviewerMaximize = () => {
    this.setState({ previewMaximized: !this.state.previewMaximized });
  }

  render () {

    const classNames = this.state.editorMaximized
      ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
      : this.state.previewMaximized
      ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
      : ["editorWrap", "previewWrap", "fa fa-expand"];

    return (
      <div>
        <Title />
        <div className='wrapper'>
          <div className='converter'/>
          <div className={classNames[0]}>
            <Header
              onClick={this.handleEditorMaximize}
              icon={classNames[2]}
              text={"Editor"}
            />
            <Editor
              markdown={this.state.markdown}
              onChange={this.handleChange}
            />
          </div>

          <div className={classNames[1]}>
            <Header
              onClick={this.handlePreviewerMaximize}
              icon={classNames[2]}
              text={"Previewer"}
            />

            <Previewer markdown={this.state.markdown} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const Header = (props) => {
  return (
    <div className="header">
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
}

const Title = () => {
  return(
    <h1 className='App-header'> Markdown Previewer </h1>
  );
}

const Editor = (props) => {
  return (
    <textarea id='editor' onChange={props.onChange} type="text" value={props.markdown} />
  );
}
const Previewer = (props) => {
  return (
      <div
        dangerouslySetInnerHTML={{ __html: marked(props.markdown) }}
        id="preview"
      />
  );
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And this is a smaller sub-heading

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is an example of ES-6 js function:

example (firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!

![React Logo](https://bit.ly/3aH5LRr)`;


;