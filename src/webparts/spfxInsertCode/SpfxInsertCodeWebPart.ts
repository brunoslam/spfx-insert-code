import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxInsertCodeWebPartStrings';
import SpfxInsertCode from './components/SpfxInsertCode';
import { ISpfxInsertCodeProps } from './components/ISpfxInsertCodeProps';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

export interface ISpfxInsertCodeWebPartProps {
  description: string;
  htmlCode: string;
}

export default class SpfxInsertCodeWebPart extends BaseClientSideWebPart<ISpfxInsertCodeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxInsertCodeProps > = React.createElement(
      SpfxInsertCode,
      {
        description: this.properties.description,
        htmlCode: this.properties.htmlCode
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  } 
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML,
                  options: {
                    wrap: true,
                    fontSize: 20,
                    // more options
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
 