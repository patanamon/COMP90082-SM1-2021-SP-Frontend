import os
import unittest
import ddt
from selenium import webdriver
from test.readYAML import GetYaml

file = os.path.join(os.path.dirname(__file__) + '/../data/', 'coordinator_homepage.yml')
yaml_data = GetYaml(file)
result = yaml_data.get_data()
test_pass = result['pass']
test_fail = result['fail']


@ddt.ddt
class ForTest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        unittest.TestCase.__init__(self, *args, **kwargs)

    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/CoordinatorHomePage')
        # path = '//p[@class="sc-AxiKw dsVvea" and text()="{button_name}"]'
        # button = 'Home (C)'
        # self.driver.find_element_by_xpath(path.format(button_name=button)).click()

    def tearDown(self) -> None:
        # time.sleep(3)
        self.driver.quit()

    # @unittest.skip('skip')
    # @ddt.data(*test_pass)
    def test_invite_pass(self, yaml_data):
        # Read test data
        # print('test case: %s' % yaml_data['test_name'])
        # print('email: %s; details: %s' % (yaml_data['email'], yaml_data['details']))

        # init xpath
        save_button_path = '//label[text()="Choose Subject"]/following-sibling::class'
        select_path = '//input[@class="form-control" and @name="{name}"]'
        table_path = '//textarea[@class="zebra" and @id="{id}"]'

        # enter email, details and click invite button
        email_path = input_path.format(name='emails')
        details_path = textarea_path.format(name='emailText')
        self.driver.find_element_by_xpath(email_path).send_keys(email)
        self.driver.find_element_by_xpath(details_path).send_keys(details)
        self.driver.find_element_by_xpath(invite_button_path).click()

        # successful send email to supervisor
        self.driver.find_element_by_xpath(
            '//*[@class="help-block" and text()="{block}"]'.format(block=invite_help_block)).is_displayed()


if __name__ == '__main__':
    unittest.main()
