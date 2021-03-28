import os
import unittest
import ddt
from selenium import webdriver
from test.readYAML import GetYaml

file = os.path.join(os.path.dirname(__file__) + '/../data/', 'email_supervisor.yml')
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
        self.driver.get('http://localhost:3000/ManageSupervisor')
        # path = '//a[@class="navbar_navbutton__3kW77" and text()="{button_name}"]'
        # button = 'Manage Supervisors'
        # self.driver.find_element_by_xpath(path.format(button_name=button)).click()

    def tearDown(self) -> None:
        # time.sleep(3)
        json_str = self.driver.execute_script("return jscoverage_serializeCoverageToJSON();")
        print(json_str)
        self.driver.quit()

    def test_send_invitation_button(self):
        login_button = 'SEND INVITATION'
        login_button_path = '//a[@class="button cta" and text()="Send Invitation"]'
        # check login button text
        self.assertEqual(self.driver.find_element_by_xpath(login_button_path).text, login_button,
                         "The sent invitation button text displays incorrectly")

    # @unittest.skip('skip')
    @ddt.data(*test_pass)
    def test_invite_pass(self, yaml_data):
        # Read test data
        print('test case: %s' % yaml_data['test_name'])
        print('email: %s; details: %s' % (yaml_data['email'], yaml_data['details']))
        email = yaml_data['email']
        details = yaml_data['details']
        invite_help_block = yaml_data['invite-help-block']

        # init xpath
        invite_button_path = '//a[@class="button cta" and text()="Send Invitation"]'
        input_path = '//input[@class="manageSupervisor_searchBar__YeP2a" and @name="{name}"]'
        textarea_path = '//textarea[@class="manageSupervisor_emailInputbox__28Ta9" and @name="{name}"]'

        # enter email, details and click invite button
        email_path = input_path.format(name='emails')
        details_path = textarea_path.format(name='emailText')
        self.driver.find_element_by_xpath(email_path).send_keys(email)
        self.driver.find_element_by_xpath(details_path).send_keys(details)
        self.driver.find_element_by_xpath(invite_button_path).click()

        # successful send email to supervisor
        self.driver.find_element_by_xpath(
            '//*[@class="help-block" and text()="{block}"]'.format(block=invite_help_block)).is_displayed()

    @ddt.data(*test_fail)
    def test_invite_fail(self, yaml_data):
        # Read test data
        print('test case: %s' % yaml_data['test_name'])
        print('email: %s; details: %s' % (yaml_data['email'], yaml_data['details']))
        email = yaml_data['email']
        details = yaml_data['details']
        invite_help_block = yaml_data['invite-help-block']
        email_help_block = yaml_data['email-help-block']
        details_help_block = yaml_data['details-help-block']

        # init xpath
        invite_button_path = '//a[@class="button cta" and text()="Send Invitation"]'
        input_path = '//input[@class="manageSupervisor_searchBar__YeP2a" and @name="{name}"]'
        textarea_path = '//textarea[@class="manageSupervisor_emailInputbox__28Ta9" and @name="{name}"]'

        # enter email, details and click invite button
        email_path = input_path.format(name='emails')
        details_path = textarea_path.format(name='emailText')
        self.driver.find_element_by_xpath(email_path).send_keys(email)
        self.driver.find_element_by_xpath(details_path).send_keys(details)
        self.driver.find_element_by_xpath(invite_button_path).click()

        # Remind to enter the information correctly
        if (invite_help_block != ''):
            self.driver.find_element_by_xpath(
                '//*[@class="help-block" and text()="{block}"]'.format(block=invite_help_block)).is_displayed()
        if (email_help_block != ''):
            self.driver.find_element_by_xpath(
                '//*[@class="help-block" and text()="{block}"]'.format(block=email_help_block)).is_displayed()
        if (details_help_block != ''):
            self.driver.find_element_by_xpath(
                '//*[@class="help-block" and text()="{block}"]'.format(block=details_help_block)).is_displayed()


if __name__ == '__main__':
    unittest.main()
