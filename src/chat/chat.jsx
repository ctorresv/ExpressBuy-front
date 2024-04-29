import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Mat"
      agent-id="763bd7cd-d6be-4ec8-9b6f-02b3e053c301"
      language-code="es"
    ></df-messenger>
  );
};

export default ChatBot;