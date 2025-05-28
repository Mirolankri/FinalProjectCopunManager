const ShareData = async ({title, text, url, AlertInstance}) => {
    const shareData = {
        title: title,
        text: text,
        url: url,
      };
      try {
        await navigator.share(shareData);
        AlertInstance("SUCCESS", "הנתונים שותפו");
      } catch (error) {
        AlertInstance("ERROR", "שגיאה בשיתוף");
      }
}
export { ShareData };
