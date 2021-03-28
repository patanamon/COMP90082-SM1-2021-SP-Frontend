# coding:utf-8
import os
import sys
import unittest
from datetime import datetime

from HTMLTestRunner import *
from test_case.test_login import *

suite = unittest.TestSuite()
case = ['test_navbar', 'test_login', 'test_email_supervisor']
date = str(datetime.datetime.now())

report_name = 'Frontend_Test_Report'
report_title = 'Automaticlly detect errors'
report_des = ''
report_path = os.path.dirname(os.path.abspath(__file__)) + '/report/'
print(report_path)
report_file = report_path + 'jenkins_report' + '.html'
if not os.path.exists(report_path):
    os.mkdir(report_path)
else:
    pass
with open(report_file, 'wb') as report:
    for item in case:
        suite.addTests(unittest.TestLoader().loadTestsFromName('test_case.' + item + '.ForTest'))
    runner = HTMLTestRunner(report, title=report_title, description=report_des)
    runner.run(suite)
report.close()
