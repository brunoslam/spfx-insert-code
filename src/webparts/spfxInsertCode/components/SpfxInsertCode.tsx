import * as React from 'react';
import styles from './SpfxInsertCode.module.scss';
import { ISpfxInsertCodeProps } from './ISpfxInsertCodeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Helmet } from "react-helmet";
import * as strings from 'SpfxInsertCodeWebPartStrings';

export default class SpfxInsertCode extends React.Component<ISpfxInsertCodeProps, {}> {
  public componentDidMount() {
    this.insertScripts(this.props);
  }
  
  private insertScripts(props: ISpfxInsertCodeProps){

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
        document.getElementById("spfx-insert-code-scriptZone").appendChild(s);
      }
    }
  }

  private cleanScriptFromHtml(htmlCode){
    if (htmlCode && htmlCode.indexOf("<script>") > -1) {
      while (htmlCode.indexOf("<script>") > -1) {
        var inicio = htmlCode.indexOf("<script>");
        var final = htmlCode.indexOf("</script>");
        var scriptInsert = htmlCode.substring(inicio, final + ("</script>").length);
        htmlCode = htmlCode.replace(scriptInsert, "");
      }
    }

    return htmlCode;
  }

  public componentDidUpdate(prevProps : ISpfxInsertCodeProps){
    // prevProps.htmlCode;
    this.insertScripts(prevProps);
  }

  public render(): React.ReactElement<ISpfxInsertCodeProps> {

    return (
      <div className={styles.spfxInsertCode}>
        <div id="spfx-insert-code-scriptZone"></div>
        <div id="spfx-insert-code-htmlZone"></div>
        <div dangerouslySetInnerHTML={{ __html: this.cleanScriptFromHtml(this.props.htmlCode) }}></div>
      </div>
    );
  }

  
}
