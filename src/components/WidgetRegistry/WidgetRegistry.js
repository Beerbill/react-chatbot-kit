import { getObject } from "../Chatbot/utils";

class WidgetRegistry {
  constructor(setStateFunc, actionProvider, messageParser) {
    this.setState = setStateFunc;
    this.actionProvider = actionProvider;
    this.messageParser = messageParser;
  }

  addWidget = ({ widgetName, widgetFunc, mapStateToProps, props }) => {
    this[widgetName] = {
      widget: widgetFunc,
      props,
      mapStateToProps,
    };
  };

  getWidget = (widgetName, state) => {
    const widgetObject = this[widgetName];

    if (!widgetObject) return;

    let props = {
      scrollIntoView: state.scrollIntoView,
      ...getObject(widgetObject.props),
      ...this.mapStateToProps(widgetObject.mapStateToProps, state),
      setState: this.setState,
      data: state.passDownProps,
      actionProvider: this.actionProvider,
      messageParser: this.messageParser,
    };

    return widgetObject.widget(props);
  };

  mapStateToProps = (props, state) => {
    if (!props) return;

    return props.reduce((acc, prop) => {
      acc[prop] = state[prop];
      return acc;
    }, {});
  };
}

export default WidgetRegistry;
