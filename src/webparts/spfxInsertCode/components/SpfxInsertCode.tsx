import * as React from 'react';
import styles from './SpfxInsertCode.module.scss';
import { ISpfxInsertCodeProps } from './ISpfxInsertCodeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Helmet } from "react-helmet";
import * as strings from 'SpfxInsertCodeWebPartStrings';

export default class SpfxInsertCode extends React.Component<ISpfxInsertCodeProps, {}> {
  public componentDidMount() {
    this.updateScripts(this.props);
  }
  
  private updateScripts(props: ISpfxInsertCodeProps){

    var htmlCode = props.htmlCode;
    if (htmlCode && htmlCode.indexOf("<script>") > -1) {
      while (htmlCode.indexOf("<script>") > -1) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;

        var scriptInsert = ``;
        var inicio = htmlCode.indexOf("<script>");
        var final = htmlCode.indexOf("</script>");
        scriptInsert = htmlCode.substring(inicio, final + ("</script>").length);
        htmlCode = htmlCode.replace(scriptInsert, "");

        s.innerHTML = scriptInsert.replace("<script>", "").replace("</script>", "");
        document.getElementById("spfx-insert-code-scriptzone").appendChild(s);
      }
    }
  }

  public componentDidUpdate(prevProps : ISpfxInsertCodeProps){
    // prevProps.htmlCode;
    this.updateScripts(prevProps);
  }

  public render(): React.ReactElement<ISpfxInsertCodeProps> {

    return (
      <div className={styles.spfxInsertCode}>
        <div id="spfx-insert-code-scriptzone"></div>
        <div dangerouslySetInnerHTML={{ __html: this.props.htmlCode }}></div>
      </div>
    );
  }

  
}
