const https = require('https');

https.get('https://statbridgestudio.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (data.includes('946652bf-632e-4a49-8ba7-1bc61256f699')) {
      console.log('SUCCESS: Live website is serving the new Access Key: 946652bf-632e-4a49-8ba7-1bc61256f699');
    } else {
      console.error('ERROR: Live website is still serving the old Access Key or not updated yet.');
    }
    if (data.includes('New Quote Request - StatBridge Studio')) {
      console.log('SUCCESS: Live website is using the new subject: "New Quote Request - StatBridge Studio"');
    } else {
      console.error('ERROR: Live website subject is not updated yet.');
    }
    if (data.includes("hiddenPlanInput.value = 'General quote request';")) {
      console.log('SUCCESS: Live website default selected_plan is: "General quote request"');
    } else {
      console.error('ERROR: Live website default selected_plan is not updated yet.');
    }
  });
}).on('error', (e) => {
  console.error(e.message);
});
