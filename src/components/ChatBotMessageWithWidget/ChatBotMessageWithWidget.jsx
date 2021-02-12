import React, { Fragment } from "react";

import ChatbotMessage from "../ChatbotMessage/ChatbotMessage";
import { ConditionallyRender } from "react-util-kit";

const ChatbotMessageWithWidget = ({
  passDownProps,
  messages,
  setState,
  scrollIntoView,
  state,
  customComponents,
  customStyles,
  widgetRegistry,
  withAvatar,
}) => {
  return (
    <Fragment>
      <ChatbotMessage
        {...passDownProps}
        customStyles={customStyles.botMessageBox}
        messages={messages}
        scrollIntoView={scrollIntoView}
        withAvatar={withAvatar}
        setState={setState}
        customComponents={customComponents}
      />
      <ConditionallyRender
        ifTrue={!passDownProps.loading}
        show={widgetRegistry.getWidget(passDownProps.widget, {
          ...state,
          passDownProps,
          scrollIntoView,
        })}
      />
    </Fragment>
  );
};

export default ChatbotMessageWithWidget;
